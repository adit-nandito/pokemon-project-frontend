import './style.css';

const DescStatus = (props) => {
  const { param, value } = props;
  let component = '';
  if (value) {
    component = (
      <div id="DescStatusComponent" className="componentDetailStatus">
        <span style={{ alignSelf: 'center', fontWeight: 'bold' }}>{param}</span>
        <span style={{ display: 'flex', gap: '10px' }}>{value}</span>
      </div>
    );
  }

  return component;
};

export default DescStatus;
