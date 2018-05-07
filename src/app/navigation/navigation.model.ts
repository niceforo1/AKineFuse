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
                        'url'  : '/add-doctor',
                        'icon': 'person_outline'
                    },
                    {
                        'id'   : 'addDoctor2',
                        'title': 'Agregar Licenciado2',
                        'translate': 'Agregar Licenciado2',
                        'type' : 'item',
                        'url'  : '/add-doctor2',
                        'icon': 'person_outline'
                    },
                    {
                        'id'   : 'listDoctors',
                        'title': 'Listar Licenciados',
                        'translate': 'Listar Licenciados',
                        'type' : 'item',
                        'url'  : '/list-doctors',
                        'icon': 'people_outline'
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
                        'url'  : '/add-patient',
                        'icon': 'person'
                    },
                    {
                        'id'   : 'listPatients',
                        'title': 'Listar Pacientes',
                        'translate': 'Listar Pacientes',
                        'type' : 'item',
                        'url'  : '/list-patients',
                        'icon': 'people'
                    }
                ]
            },
			{
                'id'      : 'setting',
                'title'   : 'Ajustes',
                'translate': 'Ajustes',
                'type'    : 'group',
                'children': [
                    {
                        'id'   : 'listPatients',
                        'title': 'Listar de Obras Sociales',
                        'translate': 'Listar de Obras Sociales',
                        'type' : 'item',
                        'url'  : '/list-social-insurances',
                        'icon': 'work'
                    }
                ]
            },
        ];
    }
}
