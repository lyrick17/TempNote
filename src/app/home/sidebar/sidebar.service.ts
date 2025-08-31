import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { NoteItem, noteItemTemp } from "./sidebar.model";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    latestId = 0; // for tracking of the id per each note item
    
    toastr = inject(ToastrService);
    currentNote = signal<NoteItem>({ ...noteItemTemp });
    notes = signal<Record<number, NoteItem>>({});
    arrayNotes = computed(() => Object.values(this.notes()));
    constructor() {
        this.initializeEffect();
    }

    initializeEffect() {
        effect(() => {
            const text = this.currentNote().text;

            if (!this.currentNote().id && this.currentNote().text) {
                // Current Note is newly created
                const newId = this.incrementAndReturnId()
                this.currentNote.update(n => ({
                    ...n,
                    id: newId
                }));
                this.updateNote(newId, text);
            } else if (this.currentNote().id) {
                // Note is being updated
                // Find the note then update its text
                this.updateNote(this.currentNote().id!, text);
            }
        });
    }

    incrementAndReturnId() {
        this.latestId++;
        return this.latestId;
    }

    updateNote(id: number, text: string) {
        this.notes.update(n => ({
            ...n,
            [id]: { id, text, }
        }));
    }

    createNewNote(shouldNotify: boolean = true) {
        this.currentNote.set({ ...noteItemTemp });

        if (shouldNotify) {
            this.toastr.success('New Notepad created.');
        }
    }

    deleteNote(item: NoteItem) {
        if (!item.id) {
            this.toastr.info('An error occured.');
            return;
        };
        
        // If the note to be deleted is current one, remove it
        if (this.currentNote().id == item.id) {
            this.createNewNote(false);
        }

        // remove the note from the map
        let newNotes = { ...this.notes() };
        delete newNotes[item.id];
        this.notes.update(n => ({
            ...newNotes,
        }));

        this.toastr.info('Note deleted.');

    }

    hasNotes(): boolean {
        // stop the user on leaving the page immediately if theyu have entered ntoes
        let numOfNotes = Object.keys(this.notes()).length;
        return numOfNotes > 0;
    }
}