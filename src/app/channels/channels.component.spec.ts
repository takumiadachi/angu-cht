import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChannelsComponent } from "./channels.component";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ChannelsComponent", () => {
  let component: ChannelsComponent;
  let fixture: ComponentFixture<ChannelsComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ChannelsComponent],
      imports: [FormsModule, ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChannelsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("should show followed channels", async () => {
  //   fixture.detectChanges();
  //   console.log("blog");
  //   console.log(debugElement);
  //   fixture.whenStable().then(() => {
  //     fixture.detectChanges();
  //     console.log("blog");
  //     console.log(debugElement);
  //     // console.log("TEST", component.getFollowedLiveStreams().length);
  //     // expect(component.getFollowedLiveStreams().length).toBeGreaterThanOrEqual(
  //     //   40
  //     // );
  //   });
  //   // fixture.whenRenderingDone().then(() => {
  //   //   console.log(debugElement);
  //   // });
  // });
});
