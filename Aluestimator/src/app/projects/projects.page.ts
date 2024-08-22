import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  project: any;
  isEditable: boolean = false;
  public ProjectId!: string;
  public projectData: any;
  private activatedRoute = inject(ActivatedRoute);
  constructor(public router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    console.log("this.project");
    this.refreshData();
    // this.route.queryParams.subscribe(params => {

    //   if (params['project']) {
    //     console.log(params, params['project']);

    //     this.project = params['project'];
    //     this.isEditable = true;
    //   }
    // });
  }

  refreshData() {
    this.ProjectId = this.activatedRoute.snapshot.paramMap.get('ProjectId') as string;
    this.projectData = localStorage.getItem('cutlary');
    if (this.projectData) {
      this.projectData = JSON.parse(this.projectData);
      this.project = this.projectData.filter((p: any) => p.projectId == parseInt(this.ProjectId));
      console.log(this.project);
    }
  }

  goTowindow() {
    console.log('goTow', this.ProjectId);
    this.navCtrl.navigateForward('/createwindow', {
      queryParams: {
        projectId: this.ProjectId
      }
    });
  }

  editProjectItem(projectItem: any) {
    this.navCtrl.navigateForward('/createwindow', {
      queryParams: {
        window: projectItem
      }
    });
  }

}
