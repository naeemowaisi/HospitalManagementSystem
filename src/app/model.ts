export class Payment{
    paymentId !: number;
    patientId !: number;
    patientName !: string;
    date !: Date;
    paymentMethod !: string;
    amount !: number;
    notes !: string;
  }
  export class Person {
    personId!: number;
    name!: string;
    birthdate!: Date;
    gender!: number;
    phoneNumber!: string;
    email!: string;
    address!: string;
    // Add other properties as per your API response
  }
  export class Doctor{
    doctorId!:number;
    specialization!:string;
    personName!:string;
    personId!:number;
  }
  export class CreateDoctorDto{
    doctorId!:number;
    specialization!:string;
    personId!:string;
  }
  export class PersonDropdown{
    personId!:number;
    personName!:string;
  }
  export class MedicalRecord{
    medicalRecordId !: number;
    description !: string;
    diagnosis !: string;
    notes !: string;
  }
  export class Appointment{
    appointmentId !: number;
    patientId !: number;
    patientName !: string;
    doctorId !: number;
    doctorSpecialization !: string;
    dateTime !: Date;
    appointmentStatus !: string;
    medicalRecordId !: number;
    diagnosisRecord !: string;
    paymentId !: number;
    paymentAmount !: number;
  }
  export class PatientDropdown{
    patientId!:number;
    patientName!:string;
  }
  export class DoctorDropdown{
    doctorId !: number;
    doctorSpecialization !: string;
  }
  export class MedicalRecordDropdown{
    medicalRecordId !: number;
    diagnosisRecord !: string;
  }
  export class PaymentDropdown{
    paymentId !: number;
    paymentAmount !: number;
  }
  export class PatientDetail{
    patientId !: number;
    doctorId !: number;
    paymentId !: number;
  }