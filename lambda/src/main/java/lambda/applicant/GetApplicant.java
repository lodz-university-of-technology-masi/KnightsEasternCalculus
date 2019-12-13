package lambda.applicant;

import com.amazonaws.services.lambda.runtime.Context;
import lambda.Handler;
import model.applicant.Applicant;
import util.Response;

public class GetApplicant extends Handler<String> {
    @Override
    public Response handleRequest(String input, Context context) {
        Applicant applicant = getMapper().load(Applicant.class, input);
        if(applicant == null)
            return new Response(404, "Applicant was not found");
        else
            return new Response(200, applicant);
    }
}
