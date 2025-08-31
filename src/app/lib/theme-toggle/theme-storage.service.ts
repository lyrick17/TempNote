import { Injectable, InjectionToken } from "@angular/core";
import { Theme } from "./theme-toggle.model";


// Injection Token for ModeStorage
export const THEME_STORAGE_SERVICE = new InjectionToken<ThemeStorage>(
    'THEME_STORAGE'
);

// Interface that defines how the theme storage should happen
export interface ThemeStorage {
    /**
     * save function for the Theme
     * @todo best to have this as async functions
     * @param theme Theme
     */
    save(theme: Theme): void;

    get(): Theme;
}

@Injectable({
    providedIn: 'root',
})
export class ThemeLocalStorageService implements ThemeStorage {

    // Key for Local Storage
    LOCAL_STORAGE_KEY = 'theme';

    save(theme: Theme): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, theme.toString());
    }

    get(): Theme {
        return <Theme>localStorage.getItem(this.LOCAL_STORAGE_KEY) || undefined;
    }
}
