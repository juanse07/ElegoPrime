// import { LassoSelect, LassoSelectIcon } from 'lucide-react';
import LastSection from '@/components/LastSection';
import NewServiceRequestForm from '@/components/NewServiceRequestForm';

// interface FormData {
//     serviceType: string;
//     zipCode: string;
//     name: string;
//     phone: string;
//     ceilingHeight: string;
//     numberOfItems: number;
//     tvInches: string;
//     additionalInfo: string;
//     state: string;
//    image1Path: string;
//     image2Path: string;
//     requestedDate: string;
// }

export default function ReservePage() {
    return (
        <div>
            <NewServiceRequestForm />
            <LastSection />
        </div>
    );
} 