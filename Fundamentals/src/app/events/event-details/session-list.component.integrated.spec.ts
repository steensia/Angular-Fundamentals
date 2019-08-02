import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement, Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { SessionListComponent } from "./session-list.component";
// import { UpvoteComponent } from './upvote.component'
import { AuthService } from "../../user/auth.service";
import { VoterService } from "./voter.service";
import { ISession} from "../shared/event.model";
import { By } from "@angular/platform-browser";
import { DurationPipe } from "../shared";
import { CollapsibleWellComponent } from "src/app/common";


describe("SessionListComponentIntegrated", () => {
    let fixture: ComponentFixture<SessionListComponent>;
    let component: SessionListComponent;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {
            isAuthenticated: () => true,
            currentUser: {userName: "Joe"}
        };
        const mockVoterService = {
            userHasVoted: () => true
        };

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                // UpvoteComponent,
                DurationPipe
                // CollapsibleWellComponent
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService }
            ],
            schemas: [
                // Utilized for ignoring components we don't want to test (Upvote/CollabsibleWell)
                // *DRAWBACK* - Can hide problems like having to import FormsModule
                NO_ERRORS_SCHEMA
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe("initial display", () => {

        it("should have the correct session title", () => {
            component.sessions = [{ id: 3, name: "Session 1",
                presenter: "Joe", duration: 1, level: "beginner",
                abstract: "abstract", voters: ["john", "bob"]}];
            component.filterBy = "all";
            component.sortBy = "name";
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            // Option #1 without nativeElement
            // expect(element.querySelector('[well-title]').textContent).toContain('Session 1');

            // Option #2 with debugElement
            expect(debugEl.query(By.css("[well-title]")).nativeElement.textContent).toContain("Session 1");
        });

        it("should have the correct session body", () => {
            component.sessions = [{ id: 3, name: "Session 2",
                presenter: "Joe", duration: 2, level: "intermediate",
                abstract: "This is a test abstract", voters: ["john", "bob"]}];
            component.filterBy = "all";
            component.sortBy = "name";
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector("h6[id='presenter']").textContent).toContain("Joe");
            expect(element.querySelector("span[id='level']").textContent).toContain("intermediate");
            expect(element.querySelector("span[id='duration']").textContent).toContain("One Hour");
            expect(element.querySelector("p[id='abstract']").textContent).toContain("This is a test");
        });
    });
});
