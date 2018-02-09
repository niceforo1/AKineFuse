import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'licenciado',
                'title'   : 'Licenciados',
                'translate': 'Licenciados',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'addDoctor',
                        'title': 'Agregar Licenciado',
                        'translate': 'Agregar Licenciado',
                        'type' : 'item',
                        'url'  : '/add-doctor'                        
                    },
                    {
                        'id'   : 'listDoctors',
                        'title': 'Listar Licenciados',
                        'translate': 'Listar Licenciados',
                        'type' : 'item',
                        'url'  : '/list-doctors'                        
                    }
                ]
            },
            {
                'id'      : 'patient',
                'title'   : 'Pacientes',
                'translate': 'Pacientes',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'addPatient',
                        'title': 'Agregar Paciente',
                        'translate': 'Agregar Paciente',
                        'type' : 'item',
                        'url'  : '/add-patient'                        
                    },
                    {
                        'id'   : 'listPatients',
                        'title': 'Listar Pacientes',
                        'translate': 'Listar Pacientes',
                        'type' : 'item',
                        'url'  : '/list-patients'                        
                    }
                ]
            },
        ];
    }
}
