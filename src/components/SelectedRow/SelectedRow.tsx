interface Props {
  selectedRow: any;
}

const SelectedRow = ({ selectedRow }: Props) => {
  return (
    <div className="selected-row">
      <div>
        <div>
          Выбран пользователь{" "}
          <b>
            {selectedRow.firstName} {selectedRow.lastName}
          </b>
        </div>
        <div>Описание:</div>
        <textarea defaultValue={selectedRow.description} />
        <div>
          Адрес проживания: <b>{selectedRow.address.streetAddress}</b>
        </div>
        <div>
          Город: <b>{selectedRow.address.city}</b>
        </div>
        <div>
          Провинция/штат: <b>{selectedRow.address.state}</b>
        </div>
        <div>
          Индекс: <b>{selectedRow.address.zip}</b>
        </div>
      </div>
    </div>
  );
};

export default SelectedRow;
