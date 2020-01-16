package lambda;

import com.fasterxml.jackson.databind.ObjectMapper;
import model.TranslateResponse;
import model.test.CloseQuestion;
import model.test.OpenQuestion;
import model.test.Test;
import model.test.ValueQuestion;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Translator {
    private String yandexKey = "trnsl.1.1.20200108T191910Z.fe657624420b3a8c.9b1c3b15e8688d96a425d4596dfc2c6321f04ee2";
    private String translateUrl = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=";
    private String url = translateUrl + yandexKey + "&text=";
    private Test test;
    private String lang = "";

    public Translator(Test test) {
        this.test = test;
        if (this.test.getLanguage() == "pl") {
            this.lang = "&lang=pl-en";
            this.test.setLanguage("en");
        } else {
            this.lang = "&lang=en-pl";
            this.test.setLanguage("pl");
        }
    }

    public Test translateTest() {
        this.test.setTitle(translateText(this.test.getTitle()));
        this.test.setCloseQuestions(translateCloseQuestions(this.test.getCloseQuestions()));
        this.test.setOpenQuestions(translateOpenQuestions(this.test.getOpenQuestions()));
        this.test.setValueQuestions(translateValueQuestions(this.test.getValueQuestions()));

        return this.test;
    }

    private String translateText(String input) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            TranslateResponse translateResponse = objectMapper.readValue(postRequest(input), TranslateResponse.class);
            return translateResponse.getText().get(0);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String postRequest(String input) {
        String result = null;
        try {
            InputStream inputStream = createConnection((this.url + input + this.lang).replace(" ", "%20")).getInputStream();
            result = streamToString(inputStream);
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return result;
    }

    private static String streamToString(InputStream inputStream) {
        String text = new Scanner(inputStream, "UTF-8").useDelimiter("\\Z").next();
        return text;
    }

    public HttpURLConnection createConnection(String input) throws IOException {
        URL obj = new URL(input);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setDoOutput(true);
        con.setInstanceFollowRedirects(false);
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("charset", "utf-8");
        con.connect();
        return con;
    }

    private List<CloseQuestion> translateCloseQuestions(List<CloseQuestion> closeQuestions) {
        for (CloseQuestion closeQuestion : closeQuestions) {
            closeQuestion.setQuestion(translateText(closeQuestion.getQuestion()));

            for (int j = 0; j < closeQuestion.getCorrectAnswers().size(); j++) {
                ArrayList<String> correctAnswers = new ArrayList<String>();
                correctAnswers.add(translateText(closeQuestion.getCorrectAnswers().get(j)));
                closeQuestion.setCorrectAnswers(correctAnswers);
            }

            for (int j = 0; j < closeQuestion.getIncorrectAnswers().size(); j++) {
                ArrayList<String> incorrectAnswer = new ArrayList<String>();
                incorrectAnswer.add(translateText(closeQuestion.getIncorrectAnswers().get(j)));
                closeQuestion.setIncorrectAnswers(incorrectAnswer);
            }
        }
        return closeQuestions;
    }

    private List<OpenQuestion> translateOpenQuestions(List<OpenQuestion> openQuestions) {
        for (OpenQuestion openQuestion : openQuestions) {
            openQuestion.setQuestion(translateText(openQuestion.getQuestion()));
            openQuestion.setCorrectAnswer(translateText(openQuestion.getCorrectAnswer()));
        }
        return openQuestions;
    }

    private List<ValueQuestion> translateValueQuestions(List<ValueQuestion> valueQuestions) {
        for (ValueQuestion valueQuestion : valueQuestions) {
            valueQuestion.setQuestion(translateText(valueQuestion.getQuestion()));
        }
        return valueQuestions;
    }
}
