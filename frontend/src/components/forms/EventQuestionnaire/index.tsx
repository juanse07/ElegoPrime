'use client';

import AddressInput from '@/components/AddressInput';
import LoadingButton from '@/components/LoadingButton';
import { ArrowLeft, ArrowRight, Wine } from 'lucide-react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import * as newEstimateApi from '../../../network/api/new-estimate';
import styles from '../../../styles/EventQuestionnaire.module.css';
import { emailSchema, nameSchema, phoneSchema } from '../../../utils/validation';
import CustomGoldDatePicker from '../../DatePickerComponent';
import TimePicker from '../../timepicker';
import { FormData, Question } from './types';

const QUESTIONNAIRE_QUESTIONS: Question[] = [
  {
    id: 'eventType',
    title: 'What type of event are you planning?',
    type: 'select',
    options: [
      'Wedding',
      'Holiday Party',
      'Corporate Event',
      'Birthday Party',
      'Engagement Party',
      'Charity Gala or Fundraiser',
      'Community Event',
      'Retirement Party',
      'Private Dinner Party',
      'Graduation Party',
      'Other'
    ]
  },
  {
    id: 'guestCount',
    title: 'How many guests are you expecting?',
    type: 'select',
    options: [
      '1-10',
      '11-25',
      '26-40',
      '41-60',
      '61-75',
      '75-100',
      '101-125',
      '125-150',
      '150-200',
      '200-300',
      '300-500',
      '500+',
      'Other'
    ]
  },
  {
    id: 'eventDate',
    title: 'When is your event?',
    type: 'date'
  },
  {
    id: 'eventTime',
    title: 'What time will your event start and end?',
    type: 'time'
  },
  {
    id: 'contactName',
    title: 'Please provide a contact name',
    type: 'name'
  },
  {
    id: 'contactEmail',
    title: 'please provide a contact email',
    type: 'email'
  },
  {
    id: 'contactPhone',
    title: 'and a phone number',
    type: 'phone'
  },
  {
    id: 'eventLocation',
    title: 'Where will your event take place?',
    type: 'location'
  },
  {
    id: 'notes',
    title: 'Any additional details we should know?',
    type: 'textarea'
  },
];

const EventQuestionnaire = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const[isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | 'current'>('current');

  const [formData, setFormData] = useState<FormData>({
    eventType: '',
    eventTypeOther: '',
    guestCount: '',
    guestCountOther: '',
    eventDate: '',
    eventTime: {
      start: '',
      end: ''
    },
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    eventLocation: '',
    notes: ''
  });

  const questions = useMemo(() => QUESTIONNAIRE_QUESTIONS, []);
  const EventQuestionnaireSchema = useMemo(() => yup.object().shape({
    eventType: yup.string().required('Event type is required'),
    guestCount: yup.string().required('Guest count is required'),
    eventDate: yup.string().optional(),
    eventTime: yup.string().optional(),
    contactName: nameSchema,
    contactEmail: emailSchema,
    contactPhone: phoneSchema,
    eventLocation: yup.string().optional(),
    notes: yup.string().optional()
  }), []);

  const scrollToTop = () => {
    console.log('Wrapper ref:', wrapperRef.current);
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'instant' });
      console.log('Scrolled using ref');
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
      console.log('Scrolled using window');
    }
  };

  
  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentSlide !== questions.length - 1) {
      return;
    }
    try {
      setIsLoading(true);
      const formDataToSend = {
        eventType: formData.eventType === 'Other' ? formData.eventTypeOther : formData.eventType,
        guestCount: formData.guestCount === 'Other' ? formData.guestCountOther : formData.guestCount,
        eventDate: new Date(formData.eventDate),
        eventTime: `${formData.eventTime.start}-${formData.eventTime.end}`,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        eventLocation: formData.eventLocation,
        notes: formData.notes

      };

      await newEstimateApi.createNewEstimate(formDataToSend);
      console.log("API call successful");
            //  alert("Quotation successfully created!");
         router.push("/thankyou");
    } catch (error) {
      console.error("Error during API call:", error);
                 const errorMessage = error instanceof Error ? error.message : "Unknown error";
                   alert("Error creating quotation: " + errorMessage);
      
    }finally {
      setIsLoading(false); // Reset loading state
  }
    // console.log('Form submitted:', formData);
    // await router.push('/estimate-event', undefined, { shallow: true });
  }, [currentSlide, formData, router, questions.length]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Listen for route changes to scroll to top
  useEffect(() => {
    const handleRouteChange = () => {
      scrollToTop();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const validateField = useCallback(async (field: keyof FormData, value: string | { start: string; end: string }) => {
    try {
      await EventQuestionnaireSchema.validateAt(field.toString(), { [field]: value });
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setValidationErrors(prev => ({ ...prev, [field]: error.message }));
      }
      return false;
    }
  }, [EventQuestionnaireSchema]);

  const handleInputChange = useCallback(async (
    questionId: keyof FormData,
    value: string | { start: string; end: string }
  ) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    await validateField(questionId, value);
  }, [validateField]);

  const validateCurrentSlide = useCallback(async () => {
    const currentQuestion = questions[currentSlide];
    
    if (currentQuestion.id === 'contactEmail') {
      const isValid = await validateField('contactEmail', formData.contactEmail);
      return isValid;
    }
    
    if (currentQuestion.id === 'eventType' || currentQuestion.id === 'guestCount' || currentQuestion.id === 'contactName') {
      const isValid = await validateField(currentQuestion.id, formData[currentQuestion.id]);
      return isValid;
    }
    
    return true;
  }, [currentSlide, questions, validateField, formData]);

  const handleNext = useCallback(async () => {
    const isValid = await validateCurrentSlide();
    if (!isValid) return;

    setSlideDirection('right');
    if (currentSlide === questions.length - 1) {
      router.push('/estimate', undefined, { shallow: true });
    } else {
      setCurrentSlide(prev => Math.min(questions.length - 1, prev + 1));
      scrollToTop();
    }
  }, [currentSlide, validateCurrentSlide, router, questions.length]);

  const handlePrevious = () => {
    setSlideDirection('left'); 
    setCurrentSlide(prev => Math.max(0, prev - 1));
    scrollToTop();
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'select':
        return (
          <>
            <div className={styles.optionsContainer}>
              <div className={styles.optionsWrapper}>
                {question.options?.map((option: string) => (
                  <div key={option} className={styles.optionItem}>
                    <Button
                      onClick={() => handleInputChange(question.id, option)}
                      className={
                        `${formData[question.id] === option
                          ? styles.optionButtonSelected
                          : styles.optionButton} ${validationErrors[question.id] ? styles.inputError : ''}`
                      }
                    >
                      {option}
                    </Button>
                    {option === 'Other' && formData[question.id] === 'Other' && (
                      <div className={styles.inputContainer}>
                        <input
                          type="text"
                          placeholder={
                            question.id === 'eventType' 
                              ? "Please specify your event type" 
                              : "Please specify number of guests"
                          }
                          className={styles.otherInput}
                          value={formData[`${question.id}Other`] as string}
                          onChange={(e) => handleInputChange(`${question.id}Other` as keyof FormData, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {validationErrors[question.id] && (
              <div className={styles.errorMessage}>{validationErrors[question.id]}</div>
            )}
          </>
        );

        case 'date':
          return (

         
            <div className={styles.dateContainer}>
            <div className={styles.datePickerWrapper}>
            <label className={styles.seasonLabel}>Select event date</label>
              {isMobile ? (
              
                <input
                  type="date"
                  placeholder="Select event date"
                  className={`${styles.input} ${validationErrors.eventDate ? styles.inputError : ''}`}
                  value={formData[question.id] as string}
                  onChange={(e) => handleInputChange(question.id, e.target.value)}
                />
              ) : (
                <CustomGoldDatePicker
                  value={formData[question.id] ? new Date(formData[question.id] as string) : null}
                  onChange={(date: Date | null) => {
                    if (date) {
                      handleInputChange(question.id, date.toISOString());
                    }
                  }}
                  label=""
                />
              )}
            </div>
            
            <div className={styles.seasonSelector}>
              <span className={styles.seasonLabel}>or select a Season</span>
              <div className={styles.seasonButtons}>
                {['Spring', 'Summer', 'Fall', 'Winter'].map((season) => (
                  <button
                    key={season}
                    type="button"
                    className={`${styles.seasonButton} ${
                      formData[`${question.id}_season`] === season.toLowerCase() ? styles.active : ''
                    }`}
                    onClick={() => handleInputChange(`${question.id}_season`, season.toLowerCase())}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>
          
            <div className={styles.monthSelector}>
              <span className={styles.monthLabel}>or select a Month</span>
              <div className={styles.monthButtons}>
                {[
                  'January', 'February', 'March', 'April',
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'
                ].map((month) => (
                  <button
                    key={month}
                    type="button"
                    className={`${styles.monthButton} ${
                      formData[`${question.id}_month`] === month.toLowerCase() ? styles.active : ''
                    }`}
                    onClick={() => handleInputChange(`${question.id}_month`, month.toLowerCase())}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
      
          );
         
          
          case 'time':
            return (
            
              <div className={styles.timeContainer}>
              <div className={styles.timeRow}>
                <label className={styles.timeLabel}>Start:</label>
                <TimePicker
                  value={formData.eventTime.start}
                  onChange={(time) => {
                    handleInputChange('eventTime', {
                      ...formData.eventTime,
                      start: time
                    });
                  }}
                />
              </div>
              <div className={styles.timeRow}>
                <label className={styles.timeLabel}>End:</label>
                <TimePicker
                  value={formData.eventTime.end}
                  onChange={(time) => {
                    handleInputChange('eventTime', {
                      ...formData.eventTime,
                      end: time
                    });
                  }}
                />
              </div>
            </div>        
        
              
            );
      case 'name':
        return (
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              className={`${styles.input} ${validationErrors.contactName ? styles.inputError : ''}`}
              value={formData[question.id] as string}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
            {validationErrors.contactName && (
              <div className={styles.errorMessage}>{validationErrors.contactName}</div>
            )}
          </div>
        );
      case 'email':
        return (
          <div>
            <input
              type="email"
              className={`${styles.input} ${validationErrors.contactEmail ? styles.inputError : ''}`}
              placeholder="Enter your email"
              value={formData[question.id] as string}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
            {validationErrors.contactEmail && (
              <div className={styles.errorMessage}>{validationErrors.contactEmail}</div>
            )}
          </div>
        );
      case 'phone':
        return (
          <div>
            <input
              type="tel"
              className={`${styles.input} ${validationErrors.contactPhone ? styles.inputError : ''}`}
              placeholder="(XXX) XXX-XXXX"
              value={formData[question.id] as string}
              onChange={(e) => handleInputChange(question.id, e.target.value)}
            />
            {validationErrors.contactPhone && (
              <div className={styles.errorMessage}>{validationErrors.contactPhone}</div>
            )}
          </div>
        );
      case 'location':
        return(
        
          <AddressInput
          
          onAddressChange={(address) => handleInputChange(question.id, address)}
        />
      
        );
      case 'textarea':
        return (
         
          <textarea
            className={`${styles.textarea} ${validationErrors.notes ? styles.inputError : ''}`}
            value={formData[question.id] as string}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
            placeholder="Share any specific requirements or preferences..."
          />
         
        );
    }
  };

  return (
    <div className={styles.container} >
      <div className={styles.wrapper} ref={wrapperRef} >
        <Form onSubmit={handleSubmit} >
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentSlide + 1) / questions.length) * 100}%`
              }}
            />
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <div 
            className={`${styles.slideContent} ${styles[`slide${slideDirection}`]}`}
            key={currentSlide}
          >
            <h2 className={styles.title}>
              {questions[currentSlide].title}
            </h2>
            {renderQuestion(questions[currentSlide])}
          </div>
        </div>

              <div className={styles.buttonContainer}>
     
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentSlide === 0}
            className={styles.buttonPrev}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentSlide === questions.length - 1 ? (
            <LoadingButton
                                        className={styles.buttonNext}
                                        type="submit"
                                        isLoading={isLoading}
                                    >
                                        {isLoading ? "Submitting..." : "Submit"}
                                        {!isLoading && <Wine size={24} className="ms-2" />}
                                    </LoadingButton>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className={styles.buttonNext}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
     
        </Form>
      </div>
    </div>
  );
};

export default EventQuestionnaire;