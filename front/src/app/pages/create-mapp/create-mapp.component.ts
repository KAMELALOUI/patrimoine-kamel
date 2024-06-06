import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/api/main.service';

@Component({
  selector: 'app-create-mapp',
  templateUrl: './create-mapp.component.html',
  styleUrls: ['./create-mapp.component.css']
})
export class CreateMappComponent implements OnInit {

  form: FormGroup;
  mappings: any[] = [];
  error: string = '';
  success: string = '';

  constructor(private mainService: MainService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      file: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadMappings();
  }

  loadMappings(): void {
    this.mainService.getMappingList().subscribe((data: any) => {
      this.mappings = data;
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        file: file
      });
    }
  }

  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('location', this.form.get('location')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('file', this.form.get('file')?.value);

      this.mainService.publishMapping(formData).subscribe((res: any) => {
        this.success = res.message;
        this.loadMappings();
      }, (err) => {
        this.error = err.message;
      });
    } else {
      this.error = 'Form is invalid';
    }
  }

  search(name: string, location: string, keyword: string): void {
    this.mainService.searchMapping(name, location, keyword).subscribe((data: any) => {
      this.mappings = data;
    });
  }
}