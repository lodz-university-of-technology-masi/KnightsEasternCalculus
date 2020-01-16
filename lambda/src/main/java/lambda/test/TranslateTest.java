package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;
import lambda.Handler;
import model.test.CloseQuestion;
import model.test.OpenQuestion;
import model.test.Test;
import model.test.ValueQuestion;
import util.Response;

import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;

public class TranslateTest extends Handler<Test> {
    private String yandexKey = "trnsl.1.1.20200108T191910Z.fe657624420b3a8c.9b1c3b15e8688d96a425d4596dfc2c6321f04ee2";
    private String translateUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";

    @Override
    public Response handleRequest(Test input, Context context) {
        Test test = getMapper().load(Test.class, input.getTestId(), input.getTestId());
        if (test == null || test.getLanguage() != input.getLanguage()) {
            input = this.translateTest(input);
            return new Response(200, input);
        } else {
            return new Response(200, input);
        }
    }


    private Test translateTest(Test test) {
        //  https://translate.yandex.net/api/v1.5/tr.json/translate
        //  ? key=<API key>
        //  & text=<text to translate>
        //  & lang=<translation direction>

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

    private String translateText(String input, String lang){
        return null;
    }


    private List<CloseQuestion> translateCloseQuestions(List<CloseQuestion> closeQuestions, String lang) {
        for (int i = 0; i < closeQuestions.size(); i++) {
            // question: string, correctAnswers: string[], incorrectAnswers: string[], answerScore: number
            closeQuestions.get(i).setQuestion(translateUrl + yandexKey + "&text=" + closeQuestions.get(i).getQuestion() + lang);

            for (int j = 0; j < closeQuestions.get(i).getCorrectAnswers().size(); j++) {
                closeQuestions.get(j).getCorrectAnswers().add(translateUrl + yandexKey + "&text=" + closeQuestions.get(i).getCorrectAnswers().get(j) + lang);
            }

            for (int j = 0; j < closeQuestions.get(i).getIncorrectAnswers().size(); j++) {
                closeQuestions.get(i).getIncorrectAnswers().add(translateUrl + yandexKey + "&text=" + closeQuestions.get(i).getIncorrectAnswers().get(j) + lang);
            }
        }
        return closeQuestions;
    }

    private List<OpenQuestion> translateOpenQuestions(List<OpenQuestion> openQuestions, String lang) {
//        for (let i = 0; i < test.openQuestions.length; i++) {
//            // question: string, correctAnswer: string, maxScore: number
//            result.openQuestions.push(new OpenQuestion(
//                            (await axios.post(translateUrl + yandexKey + '&text=' + test.openQuestions[i].question + lang)).data.text[0],
//                    (await axios.post(translateUrl + yandexKey + '&text=' + test.openQuestions[i].correctAnswer + lang)).data.text[0],
//                    test.openQuestions[i].maxScore));
//        }
        return openQuestions;
    }

    private List<ValueQuestion> translateValueQuestions(List<ValueQuestion> valueQuestions, String lang) {
//        for (let i = 0; i < test.valueQuestions.length; i++) {
//            // question: string, correctAnswer: number, maxScore: number
//            result.valueQuestions.push(new ValueQuestion(
//                            (await axios.post(translateUrl + yandexKey + '&text=' + test.valueQuestions[i].question + lang)).data.text[0],
//                    test.valueQuestions[i].correctAnswer,
//                    test.valueQuestions[i].maxScore));
//        }
        return  valueQuestions;
    }
}
