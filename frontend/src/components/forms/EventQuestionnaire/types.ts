// components/forms/EventQuestionnaire/types.ts
export type QuestionType = 'select' | 'date' | 'time' | 'textarea'|'name'|'email'|'phone'|'location';

export interface EventTime {
    start: string;
    end: string;
  }

  export interface FormData {
    eventType: string;
    eventTypeOther: string;
    guestCount: string;
    guestCountOther: string;
    eventDate: string;
    eventTime: EventTime;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    eventLocation: string;
    notes: string;

    [key: string]: string | EventTime; // Add index signature
  }

export interface Question {
  id: 'eventType' | 'guestCount' | 'eventDate' | 'eventTime' |'contactName'|'contactEmail'|'contactPhone'|'eventLocation'| 'notes';
  title: string;
  type: QuestionType;
  options?: string[];
}



  