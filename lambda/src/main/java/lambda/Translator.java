package lambda;

import model.test.CloseQuestion;
import model.test.OpenQuestion;
import model.test.Test;
import model.test.ValueQuestion;

import java.util.List;

public class Translator {
    private String yandexKey = "trnsl.1.1.20200108T191910Z.fe657624420b3a8c.9b1c3b15e8688d96a425d4596dfc2c6321f04ee2";
    private String translateUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
    private String url = translateUrl + yandexKey + "&text=";

    public Translator() {

    }

    public Test translateTest(Test test) {
        String lang = "";
        if (test.getLanguage() == "pl") {
            lang = "&lang=en-pl";
        } else {
            lang = "&lang=pl-en";
        }
        test.setTitle(translateText(test.getTitle(), lang));
        test.setCloseQuestions(translateCloseQuestions(test.getCloseQuestions(), lang));
        test.setOpenQuestions(translateOpenQuestions(test.getOpenQuestions(), lang));
        test.setValueQuestions(translateValueQuestions(test.getValueQuestions(), lang));

        return test;
    }

    private String translateText(String input, String lang) {
//        url + input + lang
        return null;
    }

    private List<CloseQuestion> translateCloseQuestions(List<CloseQuestion> closeQuestions, String lang) {
        for (CloseQuestion closeQuestion : closeQuestions) {
            closeQuestion.setQuestion(url + closeQuestion.getQuestion() + lang);

            for (int j = 0; j < closeQuestion.getCorrectAnswers().size(); j++) {
                closeQuestions.get(j).getCorrectAnswers().add(translateText(closeQuestion.getCorrectAnswers().get(j), lang));
            }

            for (int j = 0; j < closeQuestion.getIncorrectAnswers().size(); j++) {
                closeQuestion.getIncorrectAnswers().add(translateText(closeQuestion.getIncorrectAnswers().get(j), lang));
            }
        }
        return closeQuestions;
    }

    private List<OpenQuestion> translateOpenQuestions(List<OpenQuestion> openQuestions, String lang) {
        for (OpenQuestion openQuestion : openQuestions) {
            openQuestion.setQuestion(translateText(openQuestion.getQuestion(), lang));
            openQuestion.setCorrectAnswer(translateText(openQuestion.getCorrectAnswer(), lang));
        }
        return openQuestions;
    }

    private List<ValueQuestion> translateValueQuestions(List<ValueQuestion> valueQuestions, String lang) {
        for (ValueQuestion valueQuestion : valueQuestions) {
            valueQuestion.setQuestion(translateText(valueQuestion.getQuestion(), lang));
        }
        return valueQuestions;
    }
}
