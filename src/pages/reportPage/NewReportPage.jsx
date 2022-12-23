import React from 'react'

//Components
import CustomInput from '../../componets/generalComponents/CustomInput'
import CustomButton from '../../componets/generalComponents/CustomButton'
import SelectFile from '../../componets/generalComponents/SelectFile'

const NewReportPage = ({ refreshReports }) => {
  
  
    return (
        <form>
            <CustomInput type='text' placeholder='Titulo' name='title' focus />
            <CustomInput type='text' placeholder='Descripcion' name='description' />
            <CustomButton text='Agregar informe' buttonType='submit' type='primary' />
        </form>
    )
}

export default NewReportPage