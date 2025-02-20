// /components/Services.tsx
import Category from '@/pages/category';
import LastSection from '@/components/LastSection';
import NewServiceRequestForm from '@/components/NewServiceRequestForm';
import styles from '@/styles/services.module.css';

const Services: React.FC = () => {
  return (
    <div className={styles.servicesPage}>
      <Category />
      <NewServiceRequestForm />
      <LastSection />
    </div>
  );
};

export default Services;
