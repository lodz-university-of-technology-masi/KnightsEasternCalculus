package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

public class DeleteTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
        if (input.getId() != null) {
            if (getMapper().load(Test.class, input.getId()) != null) {
                getMapper().delete(input);
                return new Response(200, "Successfully deleted");
            }
        }
        return new Response(404, "Such test does not exist");
    }
}
