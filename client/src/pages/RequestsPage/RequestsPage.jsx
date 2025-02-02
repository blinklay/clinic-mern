import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRequests } from "../../redux/actions/getRequests";
import { errorsSelector } from "../../redux/selectors/requestsSelector";
import { Table } from "react-bootstrap";
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

  useEffect(() => {
    dispatch(getRequests());
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <td>{index}</td>
              <td>{request.fullName}</td>
              <td>
                <a href={`tel:${requests.phoneNumber}`}>
                  {request.phoneNumber}
                </a>
              </td>
              <td>{request.description}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
}
