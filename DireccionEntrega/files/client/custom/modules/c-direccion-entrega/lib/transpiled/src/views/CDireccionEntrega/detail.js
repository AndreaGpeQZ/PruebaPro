Espo.define('c-direccion-entrega:views/CDireccionEntrega/detail', 'views/detail', function (Dep) {
    return Dep.extend({

        afterRender: function () {
            Dep.prototype.afterRender.call(this);

            // Aplicar estilos al renderizar la vista
            this.applyStyles('comienzoHorarioEntrega');
            this.applyStyles('finalHorarioEntrega');
            this.applyStyles('horaInicioComida');
            this.applyStyles('horaFinalizacionComida');

            // Escuchar cambios en los campos y volver a aplicar estilos
            this.listenTo(this.model, 'change:comienzoHorarioEntrega', this.applyStyles.bind(this, 'comienzoHorarioEntrega'));
            this.listenTo(this.model, 'change:finalHorarioEntrega', this.applyStyles.bind(this, 'finalHorarioEntrega'));
            this.listenTo(this.model, 'change:horaInicioComida', this.applyStyles.bind(this, 'horaInicioComida'));
            this.listenTo(this.model, 'change:horaFinalizacionComida', this.applyStyles.bind(this, 'horaFinalizacionComida'));

            // Seleccionar los botones de "Guardar" y "Cancelar"
            var saveButton = this.$el.find('button[data-action="save"]');
            var cancelButton = this.$el.find('button[data-action="cancelEdit"]');

            // Verificar si el botón de "Guardar" existe
            if (saveButton.length > 0) {
                // Vincular la lógica al evento de clic del botón
                saveButton.on('click', function () {
                    this.applyStyles('comienzoHorarioEntrega');
                    this.applyStyles('finalHorarioEntrega');
                    this.applyStyles('horaInicioComida');
                    this.applyStyles('horaFinalizacionComida');
                }.bind(this));
            }

            // Verificar si el botón de "Cancelar" existe
            if (cancelButton.length > 0) {
                // Vincular la lógica al evento de clic del botón
                cancelButton.on('click', function () {
                    this.applyStyles('comienzoHorarioEntrega');
                    this.applyStyles('finalHorarioEntrega');
                    this.applyStyles('horaInicioComida');
                    this.applyStyles('horaFinalizacionComida');
                }.bind(this));
            }



            var editButton = this.$el.find('.btn.action.btn-xs-wide.detail-action-item.btn-default.radius-left');

                // Verificar si el botón de "Editar" existe
            if (editButton.length > 0) {
                // Vincular la lógica al evento de clic del botón
                editButton.on('click', function () {
                    this.applyCustomStyles('comienzoHorarioEntrega');
                    this.applyCustomStyles('finalHorarioEntrega');
                    this.applyCustomStyles('horaInicioComida');
                    this.applyCustomStyles('horaFinalizacionComida');
                }.bind(this));
            }
            // Añadir un nuevo <h4> con texto
            this.addCustomHeading();
            this.addCustomHeadingComida();
        },

        applyStyles: function (fieldName) {
            // Selecciona el div que contiene el texto del campo
            var fieldElement = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="' + fieldName + '"] .field');

            // Si el elemento no está disponible, intenta de nuevo después de un corto período
            if (fieldElement.length === 0 || fieldElement.text().trim() === '') {
                requestAnimationFrame(this.applyStyles.bind(this, fieldName));
                return;
            }

            // Obtén el texto actual del campo
            var currentText = fieldElement.text().trim();

            // Usar expresión regular para separar "Hoy" de la hora (que incluye "AM" o "PM")
            var regex = /^(Hoy) (\d{1,2}:\d{2} (AM|PM))$/;
            var matches = currentText.match(regex);

            // Verifica que el texto coincida con el formato esperado
            if (matches) {
                var hoyText = matches[1];   // "Hoy"
                var horaText = matches[2];  // "08:55 PM"

                // Actualiza el contenido HTML del div para incluir spans con clases personalizadas
                fieldElement.html('<span class="hoy-text">' + hoyText + '</span> <span class="hora-text">' + horaText + '</span>');

                // Aplica el estilo a los spans
                fieldElement.find('.hoy-text').css('display', 'none'); // Color verde para "Hoy"
                fieldElement.find('.hora-text').css('display', 'true'); // Color morado para la hora
            }


            // Aplicar estilos personalizados adicionales
            if (fieldName === 'comienzoHorarioEntrega') {

                // Aplicar margin-left al span dentro del label
                var divcomienzoHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="comienzoHorarioEntrega"] ');
                

                // Aplicar margin-left al span dentro del label
                var labelcomienzoHorarioEntrega = this.$el.find('[data-name="comienzoHorarioEntrega"] .control-label .label-text');
                

                // Aplicar bottom al div
                var fieldcomienzoHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="comienzoHorarioEntrega"]');
                

                // Función para aplicar estilos responsivos
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        divcomienzoHorarioEntrega.css({
                            'margin-left': '95px'
                        });
                        labelcomienzoHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divcomienzoHorarioEntrega.css({
                            'margin-left': '115px'
                        });
                        labelcomienzoHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divcomienzoHorarioEntrega.css('margin-left', '140px');
                        labelcomienzoHorarioEntrega.css('margin-left', '0px');
                        fieldcomienzoHorarioEntrega.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }


            // Diseño de la vista de finalizacionHorarioEntrega
            if (fieldName === 'finalHorarioEntrega') {
                // Aplicar margin-left al span dentro del label
                var divfinalHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="finalHorarioEntrega"] ');

                // Aplicar margin-left al span dentro del label
                var labelfinalHorarioEntrega = this.$el.find('[data-name="finalHorarioEntrega"] .control-label .label-text');
                

                // Aplicar bottom al div
                var fieldfinalHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="finalHorarioEntrega"]');

                var textfinalHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="finalHorarioEntrega"] .hora-text');
                
        
                // Función para aplicar estilos responsivos
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas medianas
                        divfinalHorarioEntrega.css({
                            'margin-left': '50px'
                        });
                        labelfinalHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divfinalHorarioEntrega.css({
                            'margin-left': '50px'
                        });
                        labelfinalHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divfinalHorarioEntrega.css('margin-left', '70px');
                        labelfinalHorarioEntrega.css('margin-left', '0px');
                        fieldfinalHorarioEntrega.css('bottom', '0px');
                        textfinalHorarioEntrega.css('margin-left', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }

            // Aplicar estilos personalizados adicionales
            if (fieldName === 'horaInicioComida') {
                // Aplicar margin-left al span dentro del label
                var divHoraInicioComida = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="horaInicioComida"] ');

                // Aplicar margin-left al span dentro del label
                var labelhoraInicioComida = this.$el.find('[data-name="horaInicioComida"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldhoraInicioComida = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="horaInicioComida"]');

                 // Función para aplicar estilos responsivos
                 var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        divHoraInicioComida.css({
                            'margin-left': '95px'
                        });
                        labelhoraInicioComida.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divHoraInicioComida.css({
                            'margin-left': '115px'
                        });
                        labelhoraInicioComida.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divHoraInicioComida.css('margin-left', '140px');
                        labelhoraInicioComida.css('margin-left', '0px');
                        fieldhoraInicioComida.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }

            // Diseño de la vista de finalizacionHorarioEntrega
            if (fieldName === 'horaFinalizacionComida') {
                // Aplicar margin-left al span dentro del label
                var divhoraFinalizacionComida = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="horaFinalizacionComida"] ');

                // Aplicar margin-left al span dentro del label
                var labelhoraFinalizacionComida = this.$el.find('[data-name="horaFinalizacionComida"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldhoraFinalizacionComida = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="horaFinalizacionComida"]');

                var texthoraFinalizacionComida = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="horaFinalizacionComida"] .hora-text');
        
                // Función para aplicar estilos responsivos
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas medianas
                        divhoraFinalizacionComida.css({
                            'margin-left': '50px'
                        });
                        labelhoraFinalizacionComida.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divhoraFinalizacionComida.css({
                            'margin-left': '50px'
                        });
                        labelhoraFinalizacionComida.css({ 
                            'width':'150px',
                            'margin-left': '-25px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divhoraFinalizacionComida.css('margin-left', '70px');
                        labelhoraFinalizacionComida.css('margin-left', '0px');
                        fieldhoraFinalizacionComida.css('bottom', '0px');
                        texthoraFinalizacionComida.css('margin-left', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }
        },
        

        applyCustomStyles: function (fieldName) {
            if (fieldName === 'comienzoHorarioEntrega') {
                // Aplicar margin-left al span dentro del label
                var divcomienzoHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="comienzoHorarioEntrega"]');

                // Aplicar margin-left al span dentro del label
                var labelcomienzoHorarioEntrega = this.$el.find('[data-name="comienzoHorarioEntrega"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldcomienzoHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="comienzoHorarioEntrega"]');

                // Función para aplicar estilos responsivos
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        divcomienzoHorarioEntrega.css({
                            'margin-left': '-35px'
                        });
                        labelcomienzoHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divcomienzoHorarioEntrega.css({
                            'margin-left': '-15px'
                        });
                        labelcomienzoHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divcomienzoHorarioEntrega.css('margin-left', '15px');
                        labelcomienzoHorarioEntrega.css('margin-left', '125px');
                        fieldcomienzoHorarioEntrega.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }


            if (fieldName === 'finalHorarioEntrega') {
                // Aplicar margin-left al span dentro del label
                var divfinalHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="finalHorarioEntrega"]');

                // Aplicar margin-left al span dentro del label
                var labelfinalHorarioEntrega = this.$el.find('[data-name="finalHorarioEntrega"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldfinalHorarioEntrega = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="finalHorarioEntrega"]');
                
                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        divfinalHorarioEntrega.css({
                            'margin-left': '-80px'
                        });
                        labelfinalHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        divfinalHorarioEntrega.css({
                            'margin-left': '-70px'
                        });
                        labelfinalHorarioEntrega.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divfinalHorarioEntrega.css('margin-left', '-50px');
                        labelfinalHorarioEntrega.css('margin-left', '125px');
                        fieldfinalHorarioEntrega.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }



            if (fieldName === 'horaInicioComida') {
                // Aplicar margin-left al span dentro del label
                var divhoraInicioComida = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="horaInicioComida"]');

                // Aplicar margin-left al span dentro del label
                var labelhoraInicioComida = this.$el.find('[data-name="horaInicioComida"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldhoraInicioComida = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="horaInicioComida"]');

                 // Función para aplicar estilos responsivos
                 var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                         // Estilos para pantallas pequeñas
                         divhoraInicioComida.css({
                            'margin-left': '-35px'
                        });
                        labelhoraInicioComida.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        // Estilos para pantallas medianas
                        divhoraInicioComida.css({
                            'margin-left': '-15px'
                        });
                        labelhoraInicioComida.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divhoraInicioComida.css('margin-left', '15px');
                        labelhoraInicioComida.css('margin-left', '125px');
                        fieldhoraInicioComida.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }


            if (fieldName === 'horaFinalizacionComida') {
                // Aplicar margin-left al span dentro del label
                var divhoraFinalizacionComida = this.$el.find('[data-scope="CDireccionEntrega"] .cell.col-sm-4.form-group [data-name="horaFinalizacionComida"]');

                // Aplicar margin-left al span dentro del label
                var labelhoraFinalizacionComida = this.$el.find('[data-name="horaFinalizacionComida"] .control-label .label-text');

                // Aplicar bottom al div
                var fieldhoraFinalizacionComida = this.$el.find('[data-scope="CDireccionEntrega"] div[data-name="horaFinalizacionComida"]');

                var applyResponsiveStyles = function () {
                    var windowWidth = $(window).width();
                    if (windowWidth <= 1079) {
                        // Estilos para pantallas pequeñas
                        divhoraFinalizacionComida.css({
                            'margin-left': '-80px'
                        });
                        labelhoraFinalizacionComida.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                    } else if (windowWidth <= 1280) {
                        divhoraFinalizacionComida.css({
                            'margin-left': '-70px'
                        });
                        labelhoraFinalizacionComida.css({ 
                            'width':'150px',
                            'margin-left': '105px',
                            'top':'-2px'
                        });
                        
                    } else{
                        divhoraFinalizacionComida.css('margin-left', '-50px');
                        labelhoraFinalizacionComida.css('margin-left', '125px');
                        fieldhoraFinalizacionComida.css('bottom', '0px');
                    }
                };
        
                // Aplicar estilos inicialmente
                applyResponsiveStyles();
        
                // Escuchar el evento de redimensionamiento de la ventana
                $(window).on('resize', function () {
                    applyResponsiveStyles();
                });
            }
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
                            'margin-left': '260px',  // Ajuste de margen para pantallas pequeñas
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
                'bottom':'100px',
                'margin-left': '330px',
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