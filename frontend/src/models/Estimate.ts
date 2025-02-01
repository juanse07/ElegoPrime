export interface IEstimate {
    _id: string;
    clientName: string;
    companyName?: string;
    email: string;
    phone?: string;
    address: string;
    eventDate: Date;
    startTime: string;
    endTime: string;
    numberOfGuests: number;
    servicesRequested?: string[] ;
    notes?: string;
   // state?: string;
    createdAt: Date;
    updatedAt: Date;
    

}