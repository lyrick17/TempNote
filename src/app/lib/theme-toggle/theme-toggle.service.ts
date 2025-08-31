import { DOCUMENT, inject, Injectable } from "@angular/core";
import { Theme } from "./theme-toggle.model";
import { BehaviorSubject, Observable } from "rxjs";
import { ThemeLocalStorageService } from "./theme-storage.service";

@Injectable({
    providedIn: 'root',
})
export class ThemeToggleService {
    // Contains the active mode, either light or dark
    currentTheme: Theme = Theme.LIGHT;

    // Detects the mode changes
    private themeChangedSubject = new BehaviorSubject(this.currentTheme);

    themeChanged$: Observable<Theme> = this.themeChangedSubject.asObservable();

    private document = inject(DOCUMENT); 

    private themeStorage = inject(ThemeLocalStorageService);
    constructor() {
        this.themeChanged$ = this.themeChangedSubject.asObservable();
        this.init();
    }

    /**
     * If there's a saved mode in the browser, use that
     * If no saved one, check for preferred device theme
     * If device theme is dark, set value to dark
     * else, set theme to light
     */
    private init() {
        
        const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");

        let initTheme = this.themeStorage.get();
        if (!initTheme) {
            deviceTheme.matches ? (initTheme = Theme.DARK) : (initTheme = Theme.LIGHT);
        }
        this.updateCurrentTheme(initTheme);
        this.document.body.classList.add(this.currentTheme);
    }

    /**
     * Function to mutate the currentTheme
     * @param theme Theme
    */
    private updateCurrentTheme(theme: Theme) {
        this.currentTheme = theme; 
        this.themeChangedSubject.next(this.currentTheme);
        this.themeStorage.save(this.currentTheme);
    }

    toggleTheme() {
        this.document.body.classList.toggle(Theme.LIGHT);
        this.document.body.classList.toggle(Theme.DARK);

        if (this.currentTheme === Theme.LIGHT) {
            this.updateCurrentTheme(Theme.DARK);
        } else {
            this.updateCurrentTheme(Theme.LIGHT);
        }
    }

}