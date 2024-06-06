import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from 'src/app/api/main.service';

@Component({
  selector: 'app-create-sites',
  templateUrl: './create-sites.component.html',
  styleUrls: ['./create-sites.component.css']
})
export class CreateSitesComponent {
  form: FormGroup;
  selectedFile: File | null = null;
  error: string | null = null;
  success: string | null = null;

  constructor(private fb: FormBuilder, private mainService: MainService) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      localisation: ['', Validators.required],
      descriptionHistorique: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.form.patchValue({ file: this.selectedFile });
    }
  }

  createSite() {
    if (this.form.valid && this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('nom', this.form.get('nom')?.value);
      formData.append('localisation', this.form.get('localisation')?.value);
      formData.append('descriptionHistorique', this.form.get('descriptionHistorique')?.value);

      this.mainService.addSite(formData).subscribe(
        response => {
          this.success = 'Site added successfully.';
          this.error = null;
          this.form.reset();
          this.selectedFile = null;
        },
        error => {
          this.error = 'An error occurred while adding the site.';
          this.success = null;
        }
      );
    } else {
      this.error = 'Please fill out the form correctly.';
      this.success = null;
    }
  }

  get fileInvalid() {
    return !this.selectedFile && this.form.get('file')?.touched;
  }
}
