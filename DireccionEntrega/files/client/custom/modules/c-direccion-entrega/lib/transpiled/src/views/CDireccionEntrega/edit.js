Espo.define('c-direccion-entrega:views/CDireccionEntrega/edit', 'views/edit', function (Dep) {
    return Dep.extend({

        afterRender: function () {
            Dep.prototype.afterRender.call(this);

            // Añadir un nuevo <h4> con texto
            this.addCustomHeading();
            this.addCustomHeadingComida();
        },

        
        addCustomHeading: function () {
            // Selecciona el contenedor del panel específico
            var container = this.$el.find('[data-name="panel-0"] .panel-heading');
        
            // Verifica si ya existe el <label> con data-name="horarioEntrega"
            if (container.find('[data-name="horarioEntrega"]').length === 0 ||  '.panel-heading') {
                // Crear el nuevo <label> con texto
                var newHeading = $('<label class="control-label-horario-entrega" data-name="horarioEntrega"><span class="label-text">Datos de Entrega</span></label>');
        
                // Función para aplicar estilos responsivos
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        newHeading.css({
                            'display': 'flex',
                            'justify-content': 'center',  // Centrado para pantallas pequeñas
                            'bottom': '0px',
                            'margin-left': '300px',  // Ajuste de margen para pantallas pequeñas
                            'font-weight': 'bold'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        newHeading.css({
                            'display': 'flex',
                            'justify-content': 'center',  // Centrado para pantallas medianas
                            'bottom': '0px',
                            'margin-left': '320px',  // Ajuste de margen para pantallas medianas
                            'font-weight': 'bold'
                        });
                    } else {
                        // Estilos para pantallas grandes
                        newHeading.css({
                            'display': 'flex',
                            'justify-content': 'flex-end',
                            'bottom': '0px',
                            'margin-left': '-180px',  // Ajuste de margen para pantallas grandes
                            'text-align': 'center',
                            'font-weight': 'bold'
                        });
        
                        newHeading.find('.label-text').css({
                            'font-weight': 'bold' // Cambia a tu color deseado
                        });
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
        
                // Añadir el nuevo <label> al final del contenedor del panel específico
                container.append(newHeading);
            }
        },
        

        addCustomHeadingComida: function () {
            // Selecciona el tercer <div class="row">
            var containerComida = this.$el.find('[data-scope="CDireccionEntrega"] .panel-body.panel-body-form  .row:nth-of-type(2) ');
        
            // Crear el nuevo <h5> con texto
            var newHeadingComida = $('<div class="horarioComida"> <label class="control-label-horario-comida" data-name="horarioComida"><span class="label-text">Horario de Comida</span></label></div>');
        
            // Establecer el contenedor como un contenedor flex
            newHeadingComida.css({
                'bottom':'0px',
                'margin-left': '360px',
                'text-align': 'center',
                'font-weight':'bold'
            });

            // Seleccionar el <span> específico y cambiar su color de texto
            newHeadingComida.find('.label-text').css({
                'font-weight':'bold' // Cambia a tu color deseado
            });
            
            // Añadir el nuevo <h5> al final del contenedor
            containerComida.append(newHeadingComida);
        }
        
    });
});