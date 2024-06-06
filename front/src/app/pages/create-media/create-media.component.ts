import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainService } from 'src/app/api/main.service';

@Component({
  selector: 'app-create-media',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.css']
})
export class CreateMediaComponent implements OnInit {

  form: FormGroup;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  createMedia() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('file', this.form.get('file')?.value);

    this.mainService.publishM(formData).subscribe({
      next: (response: any) => {
        this.success = 'Media published successfully.';
        this.error = null;
        this.form.reset();
      },
      error: (err) => {
        this.error = 'An error occurred while publishing media.';
        this.success = null;
      }
    });
  }
}
