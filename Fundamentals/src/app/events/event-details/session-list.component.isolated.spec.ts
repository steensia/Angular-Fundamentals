import { SessionListComponent } from "./session-list.component";
import { ISession } from "../shared/event.model";


describe("SessionListComponentIsolated", () => {
    let component: SessionListComponent;
    let mockAuthService, mockVoterService;

    beforeEach(() => {
        component = new SessionListComponent(mockAuthService, mockVoterService);
    });

    describe("ngOnChanges", () => {

        it("should filter all sessions correctly", () => {
            component.sessions = [
                {name: "session 1", level: "advanced", voters: ["1", "2"]},
                {name: "session 2", level: "intermediate", voters: ["3", "4"]},
                {name: "session 3", level: "beginner", voters: ["5", "6"]},
                {name: "session 4", level: "advanced", voters: ["7", "8"]}
            ] as ISession[];
            component.filterBy = "all";
            component.sortBy = "votes";
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(4);
        });

        it("should filter the beginner sessions correctly", () => {
            component.sessions = [
                {name: "session 1", level: "intermediate"},
                {name: "session 2", level: "intermediate"},
                {name: "session 3", level: "beginner"}
            ] as ISession[];
            component.filterBy = "beginner";
            component.sortBy = "name";
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(1);
        });

        it("should filter the intermediate sessions correctly", () => {
            component.sessions = [
                {name: "session 1", level: "intermediate"},
                {name: "session 2", level: "intermediate"},
                {name: "session 3", level: "beginner"}
            ] as ISession[];
            component.filterBy = "intermediate";
            component.sortBy = "name";
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2);
        });

        it("should filter the advanced sessions correctly", () => {
            component.sessions = [
                {name: "session 1", level: "advanced", voters: ["1", "2"]},
                {name: "session 2", level: "intermediate"},
                {name: "session 3", level: "beginner"},
                {name: "session 4", level: "advanced", voters: ["3", "4"]}
            ] as ISession[];
            component.filterBy = "advanced";
            component.sortBy = "votes";
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions.length).toBe(2);
        });

        it("should sort the sessions correctly", () => {
            component.sessions = [
                {name: "session 1", level: "intermediate"},
                {name: "session 3", level: "intermediate"},
                {name: "session 2", level: "beginner"}
            ] as ISession[];
            component.filterBy = "all";
            component.sortBy = "name";
            component.eventId = 3;

            component.ngOnChanges();

            expect(component.visibleSessions[2].name).toBe("session 3");
        });
    });
});
