
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IAServ {

  // Base de conocimiento para ferretería
  private knowledgeBase = [
    {
      category: 'saludos',
      keywords: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'qué tal'],
      responses: [
        '¡Hola! Bienvenido a Ferretería Moderna. ¿En qué puedo ayudarte hoy?',
        '¡Buen día! ¿Buscas algún producto de ferretería en particular?',
        '¡Hola! Soy tu asistente virtual de ferretería. ¿Necesitas ayuda?'
      ]
    },
    {
      category: 'horarios',
      keywords: ['horario', 'hora', 'abierto', 'cierra', 'atención', 'días', 'lunes', 'viernes', 'fin de semana'],
      responses: [
        '📅 Horario de atención: Lunes a Viernes 8:00 - 20:00, Sábados 9:00 - 14:00',
        'Estamos abiertos de Lunes a Viernes de 8am a 8pm, Sábados de 9am a 2pm',
        'Puedes visitarnos: L-V 8:00-20:00, Sáb 9:00-14:00. Domingos cerrado'
      ]
    },
    {
      category: 'ubicacion',
      keywords: ['dónde están', 'ubicación', 'dirección', 'local', 'tienda', 'encontrar', 'mapa'],
      responses: [
        '📍 Estamos en Calle Herramientas 123, Zona Industrial. ¡Te esperamos!',
        'Nuestra tienda está en Calle Herramientas 123. ¿Necesitas indicaciones?',
        'Dirección: Calle Herramientas 123, Zona Industrial. Abrimos de 8am a 8pm'
      ]
    },
    {
      category: 'contacto',
      keywords: ['teléfono', 'contacto', 'llamar', 'whatsapp', 'email', 'correo'],
      responses: [
        '📞 Teléfono: 555-1234-5678 | 📧 Email: info@ferreteriamoderna.com',
        'Puedes contactarnos al 555-1234-5678 o por WhatsApp al mismo número',
        'Para consultas: Tel: 555-1234-5678 | Email: contacto@ferreteriamoderna.com'
      ]
    },
    {
      category: 'productos',
      keywords: ['qué venden', 'productos', 'mercancía', 'artículos', 'herramientas', 'materiales'],
      responses: [
        '🔧 Tenemos: herramientas manuales, eléctricas, materiales de construcción, ferretería general, pinturas, tornillería y más.',
        'Vendemos todo tipo de herramientas, materiales de construcción, electricidad, plomería y artículos para el hogar',
        'Productos disponibles: herramientas, materiales construcción, electricidad, pinturas, cerraduras, tuberías, etc.'
      ]
    },
    {
      category: 'herramientas',
      keywords: ['martillo', 'destornillador', 'taladro', 'sierra', 'llave', 'alicate', 'herramienta eléctrica'],
      responses: [
        '¡Claro! Tenemos martillos, destornilladores, taladros, sierras, llaves inglesas y toda clase de herramientas.',
        'Contamos con amplio stock de herramientas manuales y eléctricas. ¿Buscas algo en particular?',
        'Herramientas disponibles: manuales (martillos, alicates), eléctricas (taladros, pulidoras), y más.'
      ]
    },
    {
      category: 'materiales',
      keywords: ['cemento', 'arena', 'ladrillo', 'pintura', 'tornillo', 'clavo', 'tubería', 'cable'],
      responses: [
        '🧱 Materiales de construcción: cemento, arena, grava, ladrillos, bloques, pinturas, etc.',
        'Tenemos materiales: cemento, arena, pinturas, tornillería, tuberías, cables eléctricos y más',
        'Sí, vendemos materiales de construcción, pinturas, tornillos, clavos, tuberías y cables.'
      ]
    },
    {
      category: 'precios',
      keywords: ['precio', 'cuánto cuesta', 'valor', 'barato', 'caro', 'coste', 'oferta', 'promoción'],
      responses: [
        '💰 Los precios varían según el producto. ¿Te interesa algo en particular para darte un precio aproximado?',
        'Tenemos precios competitivos. ¿Qué producto te interesa para darte más detalles?',
        'Contamos con diferentes rangos de precios. ¿Buscas algo específico?'
      ]
    },
    {
      category: 'garantia',
      keywords: ['garantía', 'devolución', 'cambio', 'falla', 'defectuoso', 'reclamo'],
      responses: [
        '✅ Todos nuestros productos tienen garantía. Para cambios o devoluciones trae tu ticket de compra.',
        'Ofrecemos garantía en todos los productos. Consulta condiciones en tienda con tu factura.',
        'Sí, tenemos política de garantías. Productos defectuosos pueden cambiarse con ticket de compra.'
      ]
    },
    {
      category: 'pago',
      keywords: ['pago', 'tarjeta', 'efectivo', 'crédito', 'débito', 'transferencia', 'cuotas'],
      responses: [
        '💳 Aceptamos: efectivo, tarjetas crédito/débito, transferencias y tenemos planes de cuotas.',
        'Métodos de pago: efectivo, todas las tarjetas, transferencia bancaria y cuotas con tarjeta.',
        'Puedes pagar con efectivo, tarjeta, transferencia. También tenemos opción a cuotas.'
      ]
    },
    {
      category: 'envio',
      keywords: ['envío', 'domicilio', 'delivery', 'entrega', 'enviar', 'transportar'],
      responses: [
        '🚚 Sí, hacemos entregas a domicilio. El costo depende de la zona y el tamaño del pedido.',
        'Ofrecemos servicio de delivery. Consulta costos según tu ubicación y productos.',
        'Hacemos envíos a domicilio. ¿De qué zona eres para calcular el costo de entrega?'
      ]
    },
    {
      category: 'ayuda',
      keywords: ['ayuda', 'asistencia', 'soporte', 'no sé', 'no encuentro', 'problema'],
      responses: [
        '¡Claro! ¿En qué necesitas ayuda? Puedo asistirte con información de productos, horarios, precios, etc.',
        'Estoy aquí para ayudarte. Cuéntame qué necesitas: ¿información de productos, horarios, ubicación?',
        '¿Qué tipo de ayuda necesitas? Puedo informarte sobre productos, horarios, precios o contacto.'
      ]
    },
    {
      category: 'agradecimiento',
      keywords: ['gracias', 'agradecido', 'perfecto', 'excelente', 'bueno', 'ok'],
      responses: [
        '¡De nada! ¿Hay algo más en lo que pueda ayudarte?',
        '¡Fue un placer! Vuelve cuando necesites algo de ferretería.',
        '¡Gracias a ti! Cualquier otra consulta, aquí estoy.'
      ]
    },
    {
      category: 'despedida',
      keywords: ['adiós', 'chao', 'hasta luego', 'nos vemos', 'bye', 'salir'],
      responses: [
        '¡Hasta luego! Que tengas un excelente día.',
        '¡Adiós! Recuerda que estamos en Calle Herramientas 123.',
        '¡Nos vemos! Gracias por contactar a Ferretería Moderna.'
      ]
    }
  ];

  // Respuestas por defecto
  private defaultResponses = [
    'Lo siento, no tengo información sobre eso. ¿Podrías preguntar sobre productos, horarios o ubicación de la ferretería?',
    'Como asistente de ferretería, puedo ayudarte con información de productos, horarios, precios y ubicación. ¿En qué más necesitas ayuda?',
    'No estoy seguro de entender. ¿Te refieres a algún producto de ferretería en particular?',
    'Pregúntame sobre herramientas, materiales de construcción, horarios de atención o ubicación de la tienda.'
  ];

  // Palabras comunes de ferretería para coincidencias parciales
  private ferreteriaKeywords = [
    'herramienta', 'martillo', 'clavo', 'tornillo', 'taladro', 'pintura', 'cemento',
    'arena', 'ladrillo', 'llave', 'destornillador', 'sierra', 'alicate', 'tubería',
    'cable', 'electricidad', 'plomería', 'construcción', 'material', 'producto'
  ];

  constructor() { }

  getResponse(userInput: string): string {
    const cleanInput = userInput.toLowerCase().trim();

    // 1. Buscar coincidencia EXACTA en keywords
    for (const item of this.knowledgeBase) {
      for (const keyword of item.keywords) {
        if (cleanInput.includes(keyword)) {
          return this.getRandomResponse(item.responses);
        }
      }
    }

    // 2. Buscar coincidencias PARCIALES con palabras de ferretería
    const ferreteriaMatches = this.ferreteriaKeywords.filter(keyword =>
      cleanInput.includes(keyword)
    );

    if (ferreteriaMatches.length > 0) {
      // Si encuentra palabras de ferretería, dar respuestas contextuales
      if (ferreteriaMatches.some(word => ['martillo', 'taladro', 'sierra'].includes(word))) {
        return '¡Claro! Tenemos esa herramienta en stock. ¿Necesitas saber el precio o características?';
      }
      if (ferreteriaMatches.some(word => ['cemento', 'arena', 'ladrillo'].includes(word))) {
        return 'Sí, vendemos materiales de construcción. ¿Qué cantidad necesitas?';
      }
      if (ferreteriaMatches.some(word => ['pintura'].includes(word))) {
        return 'Tenemos pinturas de diferentes marcas y colores. ¿Para interior o exterior?';
      }

      return `Hablas de ${ferreteriaMatches[0]}, ¿verdad? Tenemos eso disponible. ¿Necesitas más información?`;
    }

    // 3. Respuesta por defecto
    return this.getRandomResponse(this.defaultResponses);
  }

  private getRandomResponse(responses: string[]): string {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  // Método para buscar productos (puedes expandirlo después)
  searchProduct(query: string): string {
    const products = [
      { name: 'martillo', category: 'herramientas manuales' },
      { name: 'taladro', category: 'herramientas eléctricas' },
      { name: 'cemento', category: 'materiales construcción' },
      { name: 'pintura', category: 'pinturas' },
      { name: 'tornillo', category: 'tornillería' }
    ];

    const found = products.find(p =>
      query.toLowerCase().includes(p.name)
    );

    return found
      ? `Sí, tenemos ${found.name} en la categoría ${found.category}.`
      : 'No encuentro ese producto. ¿Podrías ser más específico?';
  }

  // Método para agregar nuevas preguntas/respuestas
  addCustomQA(questionKeywords: string[], responses: string[]): void {
    this.knowledgeBase.push({
      category: 'personalizado',
      keywords: questionKeywords,
      responses: responses
    });
  }

  // Ejemplos de uso rápido
  getQuickResponses(): string[] {
    return [
      '🛠️ Horarios: L-V 8:00-20:00, Sáb 9:00-14:00',
      '📍 Dirección: Calle Herramientas 123',
      '📞 Contacto: 555-1234-5678',
      '🔧 Productos: herramientas, materiales, pinturas'
    ];
  }
}
