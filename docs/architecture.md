---
title: Architecture
sidebar_position: 2
---

## Overall architecture

Validator consists of multiple components - its CLI, multiple Kubernetes controllers, and multiple CRDs ([custom resource definitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/)).

![](/img/architecture.png)

:::note

Not shown in the architecture diagram currently is the fact that `validatorctl` can also execute rules directly. In this mode, `validatorctl` does not interact with the Kubernetes cluster. It displays validation results instead of saving `ValidationResult` CRs.

:::

## Components

### validatorctl

A CLI to help with defining and executing rules, and interacting with the Kubernetes cluster used to execute rules.

### Core

The core validation controller installs plugins given a config file. It also contains the `ValidationResult` CR, which is used to store validation results for any type of rule.

### Plugins

Each plugin is a controller capable of reconciling `<PluginName>Validator` CRs.

Each of these validator CRs define one or more rules that can be provided in its spec. Reconciling them creates a `ValidationResult` CR for each validator CR, indicating whether validation succeeded or failed along with details for failures.



#### Official and community plugins

The architecture enables new types of validation to be provided by any plugin.
Right now, the only plugins are official ones (see [Repositories](/repositories)), but it is possible for new plugins to be developed in the community.

We will describe community plugins in more detail later, but if you want to get started creating a plugin now, feel free to [get in touch](/community).
