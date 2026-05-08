import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { email, form, maxLength, min, minLength, pattern, required } from '@angular/forms/signals';

interface RegisterFormModel {
  name: string;
  email: string;
  tel: string;
  address: string;
  password: string;
  vehicleName: string;
  vehiclePicture: File | null;
  plateNumber: string;
  fuelConsumption: number;
  fuelConsumptionUnit: string;
  idFront: File | null;
  idBack: File | null;
  riderImage: File | null;
  yearConfirmed: boolean;
  agreementConfirmed: boolean;
}

enum ImageType {
  VehiclePicture = 'vehiclePicture',
  IDFront = 'idFront',
  IDBack = 'idBack',
  RiderImage = 'riderImage'
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.css', '../../output.scss'],
})
export class Register {
  @ViewChild('fuelConsumptionInputField') fuelConsumptionInputField!: ElementRef<HTMLInputElement>;
  ImageType = ImageType; // Expose the ImageType enum to the template
  // image preview
  imagePreview = signal<string | null>(null);
 
  registrationFormModel = signal<RegisterFormModel>({
    name: '',
    email: '',
    tel: '',
    address: '',
    password: '',
    vehicleName: '',
    vehiclePicture: null,
    plateNumber: '',
    fuelConsumption: 0,
    fuelConsumptionUnit: '',
    idFront: null,
    idBack: null,
    riderImage: null,
    yearConfirmed: false,
    agreementConfirmed: false,
  });

  registrationForm = form(this.registrationFormModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Full Name is required' });
    required(schemaPath.email, { message: 'Email is required' });
    required(schemaPath.tel, { message: 'Telephone number is required' });

    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.vehicleName, { message: 'Vehicle Name/Model is required' });
    required(schemaPath.plateNumber, { message: 'Plate Number is required' });
    required(schemaPath.fuelConsumption, { message: 'Fuel Consumption is required' });
    required(schemaPath.fuelConsumptionUnit, { message: 'Fuel Consumption Unit is required' });
    required(schemaPath.idFront, { message: 'ID Card Front image is required' });
    required(schemaPath.idBack, { message: 'ID Card Back image is required' });
    required(schemaPath.riderImage, { message: 'Rider Image is required' });
    required(schemaPath.yearConfirmed, { message: 'You must confirm that you are over 18 years old' });
    required(schemaPath.agreementConfirmed, { message: 'You must agree to the terms and conditions' });

    email(schemaPath.email, { message: 'Please enter a valid email address' });

    minLength(schemaPath.password, 8, { message: 'Password must be at least 8 characters long' });
    minLength(schemaPath.tel, 7, { message: 'Please enter a valid telephone number' });
    minLength(schemaPath.plateNumber, 5, { message: 'Please enter a valid plate number' });
    minLength(schemaPath.vehicleName, 2, { message: 'Please enter a valid vehicle name/model' });
    minLength(schemaPath.address, 3, { message: 'Please enter a valid address' });
    minLength(schemaPath.name, 3, { message: 'Please enter a valid full name' });

    maxLength(schemaPath.tel, 15, { message: 'Please enter a valid telephone number' });

    min(schemaPath.fuelConsumption, 1, { message: 'Fuel Consumption must be greater than 0' });

    pattern(schemaPath.tel, /^\+\d{1,3}[0-9\s\-()]*$/, { message: 'Please enter a valid number' });
    pattern(schemaPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: 'Password must contain at least one smallletter, one capital letter and one number' });
  });

  Register() {
    console.log(this.registrationFormModel());
  }

  register(event: Event) {
    event.preventDefault();
    if (this.registrationForm().valid()) {
      console.log(this.registrationFormModel());
      // Here you would typically send the registration data to your backend API
    } else {
      console.log('Form is invalid');
    }
  }

  //open preview of any image
  openPreview(imageType: ImageType) {
    const file = this.registrationFormModel()[imageType];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      this.imagePreview.set(fileURL);
    }
    else{
      console.log("Exception: File not found for preview of image type: " + imageType);
      return;
    }
      
  }

  closePreview() {
    this.imagePreview.set(null);
  }

  fuelConsumptionUnitChanged() {
    // wait till the fuelConsumptionInputField is available in the DOM before trying to focus it
    setTimeout(() => {
      if (this.registrationForm.fuelConsumptionUnit().value() !== '' && this.fuelConsumptionInputField) {
        this.fuelConsumptionInputField.nativeElement.focus();
      }
    });
  }

  // This method will be called when the user selects a file for either vehicle 
  // picture, ID front, ID back, or rider image. It updates the corresponding 
  // field in the registration form model with the selected file.
  onFileSelected(event: Event, imageType: ImageType) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationFormModel.update(model => ({ ...model, [imageType]: file }));
    }
  }

} 
