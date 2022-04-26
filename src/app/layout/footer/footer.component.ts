import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear : any = new Date().getFullYear();
  apiStatus: string = 'Inactive';
  companyName = environment.companyName;
  companyWebsiteLink = environment.companyWebsiteLink;


  constructor(private userService : UserService) { }

  ngOnInit() {
    /* this.userService.checkAPIStatus().subscribe((data) => {
      this.apiStatus = data.status == true ? 'Active' : 'Inactive';
    }); */
  }

}
