import { Select, DatePicker, Row, Col } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Filters = ({ filters, setFilters = [] }) => {
    //Actualiza el tipo de transacción
    const handleTypeChange = (value) => {
        setFilters(prev => ({ ...prev, type: value }));
    };


    //Actualiza la categooría seleccionada
    const handleCategoryChange = (value) => {
        setFilters(prev => ({ ...prev, category: value }));
    };

    //Actualiza el rango de fechas
    const handleDateRangeChange = (dates) => {
        setFilters(prev => ({
            ...prev,
            dateRange: dates
                ? [dates[0].startOf('day'), dates[1].endOf('day')]
                : []
        }));
    };


    return (
        <Row gutter={16} style={{ marginBottom: 24 }}>


            {/*Tipo de transaccióon */}
            <Col xs={24} sm={8}>
                <label>Tipo</label>

                <Select
                    value={filters.type}
                    onChange={handleTypeChange}
                    style={{ width: '100%' }}>
                    <Option value='all'>Todos</Option>
                    <Option value='ingreso'>Ingreso</Option>
                    <Option value='gasto'>Gaston</Option>
                </Select>
            </Col>

            <Col xs={24} sm={8}>
                <label>Categoría</label>
                <Select
                    value={filters.category || undefined}
                    onChange={handleCategoryChange}
                    allowClear
                    placeholder="Seleccionar categoría"
                    style={{ width: '100%' }}
                >
                    {['Comida', 'Transporte', 'Sueldo', 'Ocio'].map(cat => (
                        <Option key={cat} value={cat}>{cat}</Option>
                    ))}
                </Select>
            </Col>

            {/*Rango de fechas */}
            <Col xs={24} sm={8}>
                <label>Rango de fechas</label>
                <RangePicker
                    value={filters.dateRange}
                    onChange={handleDateRangeChange}
                    format='YYYY-MM-DD'
                    style={{ width: '100%' }}
                    allowClear />
            </Col>

        </Row>
    );

};


export default Filters;