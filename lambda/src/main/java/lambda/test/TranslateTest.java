package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import lambda.Translator;
import model.test.Test;
import util.Response;

public class TranslateTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
//        Test test = getMapper().load(Test.class, input.getTestId(), input.getTestId());
//        if (test == null || test.getLanguage() != input.getLanguage()) {
            Translator translator = new Translator(input);
            input = translator.translateTest();
//        }
        return new Response(200, input);
    }
}
