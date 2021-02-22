import { UiComponentsModule } from '@speek/ui/components'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatIconRegistry } from '@angular/material/icon'
import { RouterTestingModule } from '@angular/router/testing'
import { MaterialModule } from './shared/material.module'
import { TestBed } from '@angular/core/testing'
import { AppComponent } from './app.component'
import { DomSanitizer } from '@angular/platform-browser'
import { createSpeekIcon, getLogo } from '@speek/util/format'
import { SignalingAdapter } from '@speek/core/adapter'

describe('AppComponent', () => {
  let registry: MatIconRegistry
  let sanitize: DomSanitizer
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        UiComponentsModule,
        MaterialModule,
      ],
      providers: [SignalingAdapter],
    }).compileComponents()

    registry = TestBed.inject(MatIconRegistry)
    sanitize = TestBed.inject(DomSanitizer)
    const name = 'speek-logo'
    const icon = getLogo('#ffffff')
    createSpeekIcon(registry, sanitize, [icon, name])
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.nativeElement
    expect(compiled.querySelector('mat-icon').innerHTML).toEqual(
      getLogo('#d32f2f')
    )
  })
})
