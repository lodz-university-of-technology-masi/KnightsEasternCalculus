package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

public class DeleteTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
        if (input != null) {
            Test test = getMapper().load(Test.class, input);
            if (test != null) {
                getMapper().delete(test);
                return new Response(200, "Successfully deleted");
            }
        }
        return new Response(404, "Such test does not exist");
    }
}
