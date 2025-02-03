import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../redux/actions/getRequests";
import { errorsSelector } from "../../redux/selectors/requestsSelector";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Spinner,
  Table,
} from "react-bootstrap";
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

export default function RequestsPage() {
  const serverErrors = useSelector(errorsSelector);
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const isLoading = useSelector((state) => state.requests.isLoading);

  useEffect(() => {
    dispatch(getRequests(1));
  }, []);

  const changePage = (pageNumber) => {
    dispatch(getRequests(pageNumber));
  };

  return (
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
  );
}
