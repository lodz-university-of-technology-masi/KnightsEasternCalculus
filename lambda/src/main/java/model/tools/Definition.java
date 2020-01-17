package model.tools;

import java.util.List;

public class Definition {
    private Word srcWord;
    private List<Translation> translations;

    public Word getSrcWord() {
        return srcWord;
    }

    public List<Translation> getTranslations() {
        return translations;
    }

    public void setSrcWord(Word srcWord) {
        this.srcWord = srcWord;
    }

    public void setTranslations(List<Translation> translations) {
        this.translations = translations;
    }
}
