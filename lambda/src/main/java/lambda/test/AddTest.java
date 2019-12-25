package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

public class AddTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
        if (input != null) {
            if (input.getId() == null) {
                getMapper().save(input);
                return new Response(200, "Test added successfully");
            } else {
                if (getMapper().load(Test.class, input.getId()) == null) {
                    getMapper().save(input);
                    return new Response(200, "Test added successfully");
                } else return new Response(500, "Test was not added (such test exists)");
            }
        } else return new Response(500, "Test was not added");
    }
}
