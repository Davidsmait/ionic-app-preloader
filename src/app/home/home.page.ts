import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

interface ApiCard {
  key: string,
  userKey: string
  logoKey: string,
  templateKey: string,
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  card : ApiCard | any
  id : string | null | undefined = 'b3eb83f8-2aa8-40f2-ad16-bd6a74983375'
  urlPrefix = environment.api
  isCardLoad = false

  constructor(
    private httpClient:HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      if (this.id !== null){
        console.log('Es un uuid correcto?: ',this.isUUID(this.id))
        this.httpClient.get(`${environment.api}/views/card/${this.id}`).subscribe( {
          next: (card: any) => {
            this.card = card
            this.isCardLoad = true
          },
          error: (err:any) => {
            console.log(err)
          }
        })
      }

      console.log("id: ",this.id)
    })

  }

  isUUID(str: string): boolean {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(str);
  }


}
