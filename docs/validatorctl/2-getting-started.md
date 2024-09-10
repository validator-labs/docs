---
title: Getting Started
sidebar_position: 1
---

This guide will walk you through the operational modes of the `validatorctl`, including continuous evaluation in a Kubernetes (K8s) environment and lightweight direct evaluation of validation rules.

## Operational Modes

`validatorctl` supports two primary modes of operation: `Continuous` and `Direct`.
- Continuous: Validation rules are continuously evaluated within a K8s cluster. This is ideal for ongoing compliance checks and real-time enforcement of validation rules.
- Direct: A lightweight method for rule evaluation that does not require a K8s cluster or any dependencies beyond `validatorctl`.

### Continuous Evaluation

In continuous mode, `validator` and its corresponding plugins run within a K8s cluster, automatically evaluating validation rules and optionally sending results to a user-specified sink. Both Slack and Alertmanager are supported. To prevent excessive alerting, results are hashed and reemitted only when their hash changes.

#### Install Validator and Plugins

Begin by installing `validator` and one or more plugins on your K8s cluster with the following command:
```shell
validator install
```
This step generates a validator config file (`validator.yaml`) which houses the configuration of validator and all of its plugins.

#### Apply Validation Rules

Next, you'll need to apply some validation rules to your K8s cluster:
```shell
validator rules apply --config-file validator.yaml --reconfigure
```
The above command will both apply the validation rules to your K8s cluster, and update your validator config file with all the rules that you configured.

Once these steps are complete, the plugins will evaluate the validation rules every two minutes and, if configured, `validator` will send the results to a sink of your choice.

### Direct Evaluation

In direct mode, validation rules can be evaluated locally, without continuous monitoring, making it suitable for on-demand validation with minimal setup.

To evaluate rules directly, run:
```shell
validator rules check
```

This command will interactively guide you through the process of setting up the validation rules which are then immediately evaluated.
If you want to skip the interactive prompts for configuring validation rules, you can also run pre-configured validation rules with either the `--config` or `--custom-resources` flags.

#### Validator Config

If you have a pre-existing validator config file (such as the one generated during the continuous evaluation flow), you can use it for direct validation as follows:
```shell
validator rules check --config validator.yaml
```

This command quickly evaluates the validation rules from the `validator.yaml` config file, entirely skipping the rule configuration.

#### Custom Resources

Given that `validator.yaml` contains a lot of unnecessary K8s specific information for direct evaluation (e.g., helm repository configuration), you may want to instead pass in validation rule Custom Resource (CR) documents for direct evaluation.
This can be done using the `--custom-resources` flag, which allows you to specify either a file or a directory containing validation rule CRs as shown below:
```shell
validator rules check --custom-resources /path/to/validator-cr-file-or-dir
```

The above command evaluates all validation rule CRs found in any YAML documents under the specified path, entirely skipping the rule configuration.

##### Rule Selection

If a directory path is provided, each file within the directory is checked for validation rule CRs. This means that if a user organized their CRs in a manner like this:
```
path/to/validator-crs
├── all.yaml
├── network
│   └── network.yaml
└── oci
    └── oci.yaml
```

They would be able to run `validator rules check --custom-resources /path/to/validator-crs`, and `validatorctl` will evaluate all validation rules within the 3 files found (`all.yaml`, `network.yaml`, and `oci.yaml`).
This setup offers flexibility for users to organize their custom resources as they see fit.

:::note

`validatorctl` walks the entire file tree from a particular directory that's passed in via the `--custom-resources` flag and attempts to read validation rule CRs in all the files found.
If any file has invalid validation rules configured, the command execution will fail and logs will provide the user with explicit information about what went wrong.

:::

If, instead of a directory path, a single file is passed in via the `--custom-resources` flag, only that file is checked for any validation rule CRs.

For each file, `validatorctl` will parse all validation rule CRs contained within it and directly evaluate each of them.

For instance, if the path to the following file is passed in:
```
apiVersion: validation.spectrocloud.labs/v1alpha1
kind: OciValidator
metadata:
  name: oci-validator-combined-oci-rules
spec:
  ociRegistryRules:
    - name: "public oci registry with tag"
      host: "docker.io"
      validationType: "none"
      artifacts:
        - ref: "library/redis:7.2.4"
---
apiVersion: validation.spectrocloud.labs/v1alpha1
kind: NetworkValidator
metadata:
  name: network-validator-combined-network-rules
spec:
  dnsRules:
  - name: Resolve Google
    host: google.com
```

`validatorctl` will execute both the OCI plugin rules and the Network plugin rules defined in the file.
You can choose to combine all your custom resource definitions into one file or distribute them across multiple files—both approaches are supported.
