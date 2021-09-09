import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactUsForm: FormGroup;
  public isSubmit = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.contactUsForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      PhoneNumber: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Message: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.contactUsForm.invalid) return;

    this.userService.sendMessageContactUs(this.contactUsForm.value).subscribe(
      res => {
        Swal.fire({
          icon: 'success',
          title: 'Message sent successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.contactUsForm.reset();
        // window.location.reload();
      },
      err => {
        console.log(err.message)
        Swal.fire({
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    )
  }

  ngOnInit(): void {
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');
  }

}
