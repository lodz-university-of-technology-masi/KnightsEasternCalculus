package lambda;

import com.amazonaws.services.lambda.runtime.Context;

public class SynonymOfWord extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Translator translator = new Translator();
        input = translator.getSynonyms(input);
        return new Response(200, input);
    }
}
