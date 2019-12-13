package lambda.applicant;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.Applicant;
import util.Response;

public class AddApplicant extends Handler<Applicant> {

    @Override
    public Response handleRequest(Applicant input, Context context) {
        getMapper().save(input);
        return new Response(200, input);
    }
}
