import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {User} from "../user";
import {environment} from "../../../environments/environment";
import {UserUploader} from "../user-uploader";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  apiUrl:string = environment.apiUrl;
  userForm: FormGroup;
  isEdit:boolean = false;
  isMessageVisible:boolean = false;
  userId:string = '';

  constructor(private router: Router, private route: ActivatedRoute, private userService:UserService, private formBuilder:FormBuilder, public uploader:UserUploader) { }

  ngOnInit() {
    this.uploader.onComplete = (uploadedPhotoPath:String) => {
      this.userForm.patchValue({photo: uploadedPhotoPath});
    };
    this.getUser(this.route.snapshot.params['id']);
    this.userForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'desc' : [null, Validators.required],
      'productid' : [null, Validators.required],
      'category' : [null, Validators.required],
      'photo': null
    });
  }

  getUser(id:string) {
    if(id) {
      this.userId = id;
      this.isEdit = true;
      this.userService.getUser(id).subscribe(data => {
        this.userForm.setValue({
          name: data.name ? data.name : '',
          desc: data.desc ? data.desc : '',
          productid: data.productid ? data.productid : '',
          category: data.category ? data.category : '',
          photo: data.photo ? data.photo : ''
        });
      });
    }
  }

  onFormSubmit(user:User) {
    if (this.isEdit) {
      user._id = this.userId;
      this.userService.updateUser(user).subscribe(res => {
        this.isMessageVisible = true;
      });
    } else {
      this.userService.createUser(user).subscribe(res => {
        this.router.navigate(['/users']);
      });
    }
  }
}
