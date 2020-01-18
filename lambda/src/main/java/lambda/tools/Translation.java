package lambda.tools;

import java.util.List;

public class Translation {
    private Word translatedWord;
    private List<String> srcMeans;
    private List<Example> examples;
    private List<Word> synonyms;

    public Word getTranslatedWord() {
        return translatedWord;
    }

    public List<String> getSrcMeans() {
        return srcMeans;
    }

    public List<Example> getExamples() {
        return examples;
    }

    public List<Word> getSynonyms() {
        return synonyms;
    }

    public void setTranslatedWord(Word translatedWord) {
        this.translatedWord = translatedWord;
    }

    public void setSrcMeans(List<String> srcMeans) {
        this.srcMeans = srcMeans;
    }

    public void setExamples(List<Example> examples) {
        this.examples = examples;
    }

    public void setSynonyms(List<Word> synonyms) {
        this.synonyms = synonyms;
    }
}
