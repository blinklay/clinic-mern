import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../redux/actions/getRequests";
import {
  errorsSelector,
  isLoadingSelector,
  requestsSelector,
} from "../../redux/selectors/requestsSelector";
import {
  Alert,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledTable = styled(Table)`
  table-layout: fixed;
  width: 100%;

  td,
  th {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
`;

const FIRST_PAGE_NUMBER = 1;

export default function RequestsPage() {
  const serverErrors = useSelector(errorsSelector);
  const dispatch = useDispatch();
  const requests = useSelector(requestsSelector);
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(getRequests(FIRST_PAGE_NUMBER));
  }, []);

  const changePage = (pageNumber) => {
    dispatch(getRequests(pageNumber));
  };

  return (
    <>
      {serverErrors.status === 403 && (
        <>
          <Alert variant="danger">
            {serverErrors.status} {serverErrors.msg}
          </Alert>
          <Link to="/login">Авторизация</Link>
        </>
      )}

      {serverErrors.status && serverErrors.status !== 403 && (
        <Alert variant="danger">
          {serverErrors.status} {serverErrors.msg}
        </Alert>
      )}

      {serverErrors.status !== 403 && (
        <>
          <p className="h1">Список заявок: </p>

          <StyledTable striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>ФИО</th>
                <th>Телефон</th>
                <th>Описание</th>
                <th>Дата создания</th>
              </tr>
            </thead>
            <tbody>
              {requests.requests.map((request) => (
                <tr key={request._id}>
                  <td>
                    {"#" +
                      request._id.slice(
                        request._id.length - 7,
                        request._id.length - 1
                      )}
                  </td>
                  <td>{request.fullName}</td>
                  <td>
                    <a href={`tel:${requests.phoneNumber}`}>
                      {request.phoneNumber}
                    </a>
                  </td>
                  <td>{request.description}</td>
                  <td>{new Date(request.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </StyledTable>

          {isLoading && <Spinner animation="grow" />}

          <ButtonToolbar aria-label="Toolbar with button groups mt-3">
            <ButtonGroup className="me-2" aria-label="First group">
              {new Array(requests.totalPages).fill("").map((_, index) => (
                <Button
                  disabled={requests.currentPage === index + 1}
                  key={index}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))}
            </ButtonGroup>
          </ButtonToolbar>
        </>
      )}
    </>
  );
}
