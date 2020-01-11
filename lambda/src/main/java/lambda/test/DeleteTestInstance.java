package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.TestInstance;
import util.Response;

public class DeleteTestInstance extends Handler<String[]> {
    @Override
    public Response handleRequest(String[] input, Context context) {
        TestInstance test = getMapper().load(TestInstance.class, input[0], Long.parseLong(input[1]));
        if(test == null)
            return new Response(404, "Test not found");

        getMapper().delete(test);
        return new Response(204, null);
    }
}
