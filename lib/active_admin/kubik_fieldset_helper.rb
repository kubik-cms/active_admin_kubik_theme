# frozen_string_literal: true

module ActiveAdmin
  module KubikFieldsetHelper
    def kubik_admin_fieldset(title, actions: nil, &block)
      render layout: "active_admin/kubik/fieldset", locals: { title: title, actions: actions }, &block
    end
  end
end
