package lambda.test;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.test.Test;
import util.Response;

import java.util.Date;

public class AddTest extends Handler<Test> {

    @Override
    public Response handleRequest(Test input, Context context) {
        input.setSearchTitle(input.getTitle().toLowerCase());
        input.setTestId(new Date().getTime());
        getMapper().save(input);
        return new Response(200, input);
    }
}
