package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;

import lambda.Handler;
import model.test.TestInstance;
import util.Response;

public class GetTestInstance extends Handler<String> {

    @Override
    public Response handleRequest(String input, Context context) {
        String[] tab = input.split("=");
        TestInstance instance = getMapper().load(TestInstance.class, tab[0], tab[1]);
        if (instance == null) {
            return new Response(404, "Test instance was not found");
        } else {
            return new Response(200, instance);
        }
    }

}