import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Subscription} from 'rxjs';

import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';

@Component({
  selector: 'app-properties-accept-invitation',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    AsyncPipe,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgIf,
    ProgressSpinnerModule,
  ],
  templateUrl: './properties-accept-invitation.component.html',
  styleUrl: './properties-accept-invitation.component.scss',
})
export class PropertiesAcceptInvitationComponent implements OnInit, OnDestroy {
  propertyId: string = '';
  tokenValue: string = '';
  isAccepted: boolean = false;
  propertyByIdSubscription?: Subscription;
  protected readonly propertiesStore = inject(PropertiesStore);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.propertyId = params['propertyId'];
      this.tokenValue = params['tokenValue'];
      this.propertiesStore.loadPropertyById(this.propertyId);
    });
  }

  ngOnDestroy() {
    this.propertyByIdSubscription?.unsubscribe();
  }

  doAcceptInvitation() {
    this.propertiesStore.acceptPropertyInvitation(
        this.propertyId,
        this.tokenValue,
    );
    this.isAccepted = true;
  }
}
