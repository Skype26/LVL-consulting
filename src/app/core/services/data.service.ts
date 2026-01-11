//servicio con data dummy + signals
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class DataService {
    stats = signal([
        { title: 'ingresos', value: 'S/1000' },
        { title: 'Clientes', value: '4956' },
        { title: 'Inversiones', value: 'S/6554k' },
        { title: 'Ganancia', value: 'S/1000' }
    ]);
}