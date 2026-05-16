import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { email, form, maxLength, min, minLength, pattern, required, schema } from '@angular/forms/signals';
import {ViewportScroller} from "@angular/common";

interface RegisterFormModel {
  name: string;
  email: string;
  tel: string;
  address: string;
  password: string;
  vehicleName: string;
  vehiclePicture: File | null;
  plateNumber: string;
  fuelConsumption: number | null;
  whUnit: number | null; // electric bike: watt-hours
  rangeKm: number | null;
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
  @ViewChild('fuelConsumptionInputField')
  fuelConsumptionInputField!: ElementRef<HTMLInputElement>;
  ImageType = ImageType;
  imagePreview = signal<string | null>(null);
  displayError: boolean = false;

  // Custom validation messages for consumption fields
  customErrors = signal<{
    fuelConsumption?: string | null;
    whUnit?: string | null;
    rangeKm?: string | null;
  }>({});

  registrationFormModel = signal<RegisterFormModel>({
    name: '',
    email: '',
    tel: '',
    address: '',
    password: '',
    vehicleName: '',
    vehiclePicture: null,
    plateNumber: '',
    fuelConsumption: null,
    whUnit: null,
    rangeKm: null,
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
    required(schemaPath.address, { message: 'Address is required' });

    required(schemaPath.password, { message: 'Password is required' });
    required(schemaPath.vehicleName, {
      message: 'Vehicle Name/Model is required',
    });
    required(schemaPath.vehiclePicture, {
      message: 'vehicle picture is required',
    });
    required(schemaPath.plateNumber, { message: 'Plate Number is required' });
    required(schemaPath.fuelConsumptionUnit, {
      message: 'Fuel Consumption Unit is required',
    });
    required(schemaPath.idFront, {
      message: 'ID Card Front image is required',
    });
    required(schemaPath.idBack, { message: 'ID Card Back image is required' });
    required(schemaPath.riderImage, { message: 'Rider Image is required' });
    required(schemaPath.yearConfirmed, {
      message: 'You must confirm that you are over 18 years old',
    });
    required(schemaPath.agreementConfirmed, {
      message: 'You must agree to the terms and conditions',
    });

    email(schemaPath.email, { message: 'Please enter a valid email address' });

    minLength(schemaPath.password, 8, {
      message: 'Password must be at least 8 characters long',
    });
    minLength(schemaPath.tel, 7, {
      message: 'Please enter a valid telephone number',
    });
    minLength(schemaPath.plateNumber, 5, {
      message: 'Please enter a valid plate number',
    });
    minLength(schemaPath.vehicleName, 2, {
      message: 'Please enter a valid vehicle name/model',
    });
    minLength(schemaPath.address, 3, {
      message: 'Please enter a valid address',
    });
    minLength(schemaPath.name, 3, {
      message: 'Please enter a valid full name',
    });

    maxLength(schemaPath.tel, 15, {
      message: 'Please enter a valid telephone number',
    });

    pattern(schemaPath.tel, /^\+\d{1,3}[0-9\s\-()]*$/, {
      message: 'Please enter a valid number',
    });
    pattern(schemaPath.password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
      message:
        'Password must contain at least one small letter, one capital letter and one number',
    });
  });

  viewPortScroller: ViewportScroller = inject(ViewportScroller);

  Register() {
    console.log(this.registrationFormModel());
  }

  checkInvalidity(): boolean {
    if (this.registrationForm.name().invalid()) {
      this.scrollToElement('nameInput');
    } else if (this.registrationForm.email().invalid()) {
      this.scrollToElement('emailInput');
    } else if (this.registrationForm.tel().invalid()) {
      this.scrollToElement('telInput');
    } else if (this.registrationForm.address().invalid()) {
      this.scrollToElement('addressInput');
    } else if (this.registrationForm.password().invalid()) {
      this.scrollToElement('passwordInput');
    } else if (this.registrationForm.vehicleName().invalid()) {
      this.scrollToElement('vehicleNameInput');
    } else if (this.registrationForm.vehiclePicture().invalid()) {
      this.scrollToElement('vehiclePictureInput');
    } else if (this.registrationForm.plateNumber().invalid()) {
      this.scrollToElement('plateNumberInput');
    } else if (
      this.registrationForm.fuelConsumption().invalid() ||
      this.customErrors().fuelConsumption != null
    ) {
      this.scrollToElement('fuelConsumptionInput');
    } else if (
      this.registrationForm.whUnit().invalid() ||
      this.customErrors().whUnit != null
    ) {
      this.scrollToElement('fuelConsumptionUnitInput');
    } else if (
      this.registrationForm.rangeKm().invalid() ||
      this.customErrors().rangeKm != null
    ) {
      this.scrollToElement('fuelConsumptionUnitInput');
    } else if (this.registrationForm.fuelConsumptionUnit().invalid()) {
      this.scrollToElement('fuelConsumptionUnitInput');
    } else if (this.registrationForm.idFront().invalid()) {
      this.scrollToElement('idFrontInput');
    } else if (this.registrationForm.idBack().invalid()) {
      this.scrollToElement('idBackInput');
    } else if (this.registrationForm.riderImage().invalid()) {
      this.scrollToElement('riderImageInput');
    } else if (this.registrationForm.yearConfirmed().invalid()) {
      this.scrollToElement('yearConfirmedInput');
    } else if (this.registrationForm.agreementConfirmed().invalid()) {
      this.scrollToElement('agreementConfirmedInput');
    }

    return !this.registrationForm().invalid();
  }

  scrollToElement(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  register(event: Event) {

    // Reset custom errors
    this.customErrors.set({});

    const unit = this.registrationForm.fuelConsumptionUnit().value();
    const model = this.registrationFormModel();

    // Validate consumption fields based on unit
    if (unit === 'km/litre') {
      if (model.fuelConsumption == null || model.fuelConsumption <= 0) {
        this.customErrors.update((e) => ({
          ...e,
          fuelConsumption: 'Fuel Consumption must be greater than 0',
        }));
      } else {
        this.customErrors.update((e) => ({
          ...e,
          fuelConsumption: null,
        }));
      }
    } else if (unit === 'Wh/km') {
      if (model.whUnit == null || model.whUnit <= 0) {
        this.customErrors.update((e) => ({
          ...e,
          whUnit: 'WH Unit must be greater than 0',
        }));
      } else {
        this.customErrors.update((e) => ({
          ...e,
          whUnit: null,
        }));
      }
      if (model.rangeKm == null || model.rangeKm <= 0) {
        this.customErrors.update((e) => ({
          ...e,
          rangeKm: 'Range must be greater than 0',
        }));
      } else {
        this.customErrors.update((e) => ({
          ...e,
          rangeKm: null,
        }));
      }
    }

    this.checkInvalidity();

    if (this.registrationForm().valid()) {
      console.log('Registration data:', this.registrationFormModel());
      // API call here
    } else {
      console.log('Form is invalid');
      this.displayError = true;
    }
  }

  openPreview(imageType: ImageType) {
    const file = this.registrationFormModel()[imageType];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      this.imagePreview.set(fileURL);
    } else {
      console.log(
        'Exception: File not found for preview of image type: ' + imageType,
      );
    }
  }

  closePreview() {
    this.imagePreview.set(null);
  }

  fuelConsumptionUnitChanged() {
    // Clear custom errors when unit changes
    this.customErrors.set({});

    const unit = this.registrationForm.fuelConsumptionUnit().value();
    if (unit === 'km/litre') {
      // Clear electric fields
      this.registrationFormModel.update((model) => ({
        ...model,
        whUnit: null,
        rangeKm: null,
      }));
      setTimeout(() => {
        if (this.fuelConsumptionInputField) {
          this.fuelConsumptionInputField.nativeElement.focus();
        }
      });
    } else if (unit === 'Wh/km') {
      // Clear fuel consumption field
      this.registrationFormModel.update((model) => ({
        ...model,
        fuelConsumption: null,
      }));
    }
  }

  onFileSelected(event: Event, imageType: ImageType) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationFormModel.update((model) => ({
        ...model,
        [imageType]: file,
      }));
    }
  }
} 
